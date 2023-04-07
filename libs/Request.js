async function index (req){
    req.body = await getBody(req)
    return req
}
async function getBody(req){
    if(req.headers['content-type'].startsWith('multipart/form-data')) return await bodyFormData(req);
    
    if(req.headers['content-type'].startsWith('application/json')) return await bodyJson(req)
}
async function bodyJson(req){
    let data = [];
    await req.on('data', (chunk) => {
        data.push(chunk);
    })
    
    await req.on('end', async() => {
        try { 
            data = await JSON.parse(data) 
        }catch (error) { 
            console.log('formato nao suportado')  
        }
    });
        
    return JSON.parse(body)
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
module.exports = index