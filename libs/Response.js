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
    res.view = (viewFile)=>{
        view(viewPath, viewFile, res)
        return res
    }
    return res
}
function view(viewPath, viewFile,res){
    console.log(path.join(viewPath,viewFile))
    fs.readFile(path.join(viewPath,viewFile), function(err, page) {
        if (err) {
          res.write('ocorreu um erro ao tentar ler sua view');
          res.end();
          return ;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
    });
}
function json(obj, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
}
module.exports = index