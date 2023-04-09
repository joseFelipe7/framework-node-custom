const fs = require('fs')
const path = require('path')
async function index (res, viewPath){
    res.status = (status)=>{
        res.statusCode = status
        return res
    }
    res.json = (obj)=>{

        json(obj, res)
        return res
    }
    res.view = (viewFile, data = {})=>{
        let output = view(viewPath, viewFile, data, res)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(output);
        res.end();
        return res
    }
    res.redirect = (routePath)=>{
        redirect(routePath, res)
        res.end();
        return res
    }
    return res
}
function view(viewPath, viewFile, data, res){
    let exists = fs.existsSync(path.join(viewPath,viewFile))
        if (exists) {
            try {
                let page = fs.readFileSync(path.join(viewPath,viewFile), 'utf8')

                const matches = page.match(/{{.+?}}/g);
                if(matches){
                    matches.forEach((item, index)=>{
                        let key = item.slice(2, -2).trim()
                        let regex = /\((.*?)\)/;
                        let match = regex.exec(key);

                        if (match) {
                            let [callback, paramPage] = key.slice(0, -1).split('(')
                            if(callback == 'include'){
                                const indexStart = page.indexOf(matches[index]);
                                page = page.substring(0, indexStart) + view(viewPath, paramPage, data, res) + page.substring(indexStart + matches[index].length); 
                            }
                        } 
                    })
                }
            
                let output = page;
                for (const key in data) {
                    output = output.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), data[key]);
                }
                
                return output
            } catch (error) {
                return 'ocorreu um erro ao tentar ler sua view';
            }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        throw new Error('view nao encontrada')
    }
}
function json(obj, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
}
function redirect(routePath, res){
    res.writeHead(301, {'Location': routePath});
}
module.exports = index