const url = require('url')
async function index (req){
    req.body = await getBody(req)
    req.query = getQuery(req)
    return req
}
function getQuery(req){
    const queryObject = url.parse(req.url, true).query;
    return Object.assign({}, queryObject);
}
async function getBody(req){
    if(!req.headers['content-type']) return {}

    if(req.headers['content-type'].startsWith('multipart/form-data')) return await bodyFormData(req);

    if(req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) return await bodyAplicationFormData(req);
    
    if(req.headers['content-type'].startsWith('application/json')) return await bodyJson(req)
}
async function bodyJson(req){
    let data = [];
    await new Promise((resolve, reject) => {
        req.on('data', (chunk) => {
            data.push(chunk);
        })
        req.on('end', () => {
            resolve();
        });
    });
    return data.length>0?JSON.parse(data):{}
}
async function bodyFormData(req){
    let data = {};
    const boundary = req.headers['content-type'].split('; ')[1].split('=')[1];
    const chunks = [];
    let totalLength = 0;
    
    await new Promise((resolve, reject) => {
        req.on('data', chunk => {
            chunks.push(chunk);
            totalLength += chunk.length;
        });
        
        req.on('end', () => {
            resolve();
        });
    });
    
    const buffer = Buffer.concat(chunks, totalLength);
    const parts = buffer.toString().split(`--${boundary}`);

    await Promise.all(parts.map(async (part) => {
        if (!part.trim()) return;

        const [headers, body] = part.trim().split('\r\n\r\n');
        const nameMatch = headers.match(/name="(.+?)"/);
        const filenameMatch = headers.match(/filename="(.+?)"/);

        if (filenameMatch) {
            // handle file
        } else if (nameMatch) {
            if(nameMatch[1].indexOf('[]') != -1){
                const [ name ] = nameMatch[1].split('[]')
                let previous = data[name]?data[name]:[]
                data[name] = [...previous, body];
            }else{
                data[nameMatch[1]] = body;
            }
        }
    }));

    return data;
}
async function bodyAplicationFormData(req){
    const data = {};
    let chunks = '';
    
    await new Promise((resolve, reject) => {
        req.on('data', chunk => {
            chunks+=chunk;
        });
        
        req.on('end', () => {
            resolve();
        });
    });

    const keyValuePairs = chunks.split('&');
    for (let i = 0; i < keyValuePairs.length; i++) {
        const [key, value] = keyValuePairs[i].split('=');
        
        data[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    }

    return data;
}
module.exports = index