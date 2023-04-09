const http = require('http');
const path = require('path');
const Router = require('./Router')
const request = require('./Request')
const response = require('./Response')
const Database = require('./Database')

class App {
    constructor() { 
        this.router = new Router
        this.viewPath = path.join('app', 'views')

        this.server = http.createServer(async (req, res) => {
        
            req = await request(req)
            res = await response(res, this.viewPath)
            
            this.router.use(req, res)
        });
        
    }
    start(hostname = '127.0.0.1', port = 3000){
        this.server.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
    }
    useRoute(router){
        this.router.routes = this.#mergeRoutes(this.router.routes, router.routes)
    }
    viewFolder(folderPath){
      this.viewPath = folderPath
    }
    publicFolder(publicPath){
      this.router.publicFolder = publicPath
    }
    #mergeRoutes(obj1, obj2) {
        const merged = {};
        for (let key in obj1) {
          if (obj2.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
              merged[key] = this.#mergeRoutes(obj1[key], obj2[key]);
            } else {
              merged[key] = obj2[key];
            }
          } else {
            merged[key] = obj1[key];
          }
        }
        for (let key in obj2) {
          if (!obj1.hasOwnProperty(key)) {
            merged[key] = obj2[key];
          }
        }
        return merged;
    }
    
}

module.exports = { App, Router, Database  }