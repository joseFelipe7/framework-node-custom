const http = require('http');
const Router = require('./Router')
const request = require('./Request')
const response = require('./Response')

class App {
    constructor() { 
        this.router = new Router
        this.server = http.createServer(async (req, res) => {
            req = await request(req)
            this.router.use(req, res)
        });
    }
    start(hostname = '127.0.0.1', port = 3000){
        this.server.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
    }
    useRoute(router){
        this.router.routes = this.#mergeRoutes(this.router.routes, router.routes)
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
module.exports = { App, Router }
// start
// view
// json
// router()
// res.json()
// res.view()

// Define your routes and their respective handlers
//router.get('/', (req,res)=>{res.end('hello')})
//routes.define()
//lib de rotas permitir definir rotas novas de maneira simplificada
//ter uma função para infentificar a rota chamada e o method
//verificar se ah parametro e permitir ele ser usado faciç
//ser facil de usar


// console.log()
// const server = http.createServer((req, res) => {
//   routes.use(req, res)
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });