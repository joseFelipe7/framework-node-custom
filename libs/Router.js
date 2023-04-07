class Router {
    
    constructor() { 
        this.routes = {
            GET:{},
            POST:{},
            PUT:{},
            DELETE:{}
        }
    }
    use(req, res){
        const method = req.method;
        const handler = this.routes[method][req.url];

        if (handler) return handler(req, res);

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
    get(router, callback){ 
        this.routes['GET'][router] = callback
    }

    post(router, callback){
        this.routes['POST'][router] = callback
    }

    put(router, callback){
        this.routes['PUT'][router] = callback
    }
    
    delete(router, callback){
        this.routes['DELETE'][router] = callback
    }
}

module.exports = Router
