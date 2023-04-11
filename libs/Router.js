const fs = require('fs')
const url = require('url')
const path = require('path')
class Router {
    
    constructor() { 
        this.routes = {
            GET:{},
            POST:{},
            PUT:{},
            DELETE:{}
        }
        this.publicFolder = path.join('public')
    }
    use(req, res){

        try {
            const path = url.parse(req.url).pathname;
        
            const [,extension] = path.split('.');
            if(extension) return this.publicFile(req, res)

            const method = req.method;
            const handler = this.routes[method][req.url];
            const middleware = this.routes[method][req.url]['middleware']
            if (middleware && handler) return middleware(req,res,()=>{ handler(req,res) })
            if (handler) return handler(req, res);
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
        

        
    }
    get(router, callback, middleware = false){ 
        this.routes['GET'][router] = callback
        this.routes['GET'][router]['middleware'] = middleware

    }
    post(router, callback, middleware = false){
        this.routes['POST'][router] = callback
        this.routes['POST'][router]['middleware'] = middleware
    }

    put(router, callback, middleware = false){
        this.routes['PUT'][router] = callback
        this.routes['PUT'][router]['middleware'] = middleware
    }
    
    delete(router, callback, middleware = false){
        this.routes['DELETE'][router] = callback
        this.routes['DELETE'][router]['middleware'] = middleware
    }
    publicFile(req, res){
        const filePath = path.join(this.publicFolder, req.url);

        fs.exists(filePath, (exists) => {
            if (exists) {
                
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server error');
                } else {
                    const extname = path.extname(filePath);
                    let contentType = 'text/html';
                    switch (extname) {
                        case '.css':
                        contentType = 'text/css';
                        break;
                        case '.js':
                        contentType = 'text/javascript';
                        break;
                        case '.png':
                        contentType = 'image/png';
                        break;
                        case '.jpg':
                        contentType = 'image/jpg';
                        break;
                    }

                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
        });
    }
}

module.exports = Router
