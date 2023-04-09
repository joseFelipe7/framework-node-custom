const http = require('http');
const path = require('path');

const Router = require('./Router')
const request = require('./Request')
const response = require('./Response')
const Database = require('./Database')
const Hashing = require('./Hashing')

class App {
    constructor() { 
        this.router = new Router
        this.viewPath = path.join('app', 'views')
        this.sessions = {};
        this.server = http.createServer(async (req, res) => {
          await this.#startSession(req,res)
          
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
    #startSession(req,res){

      let sessionId;
      // Verifica se o cookie 'sessionId' já existe na requisição
      if (req.headers.cookie) {
        const cookies = req.headers.cookie.split('; ');
        cookies.forEach(cookie => {
          if (cookie.startsWith('sessionId=')) {
            sessionId = cookie.split('=')[1];
          }
        });
      }
      // Se o ID da sessão não existir ou não for válido, cria um novo com base na data atual
      if (!sessionId || !this.sessions[sessionId]) {
        sessionId = new Date().getTime().toString();
        this.sessions[sessionId] = {};
        //registro a sessão no cookie do header
        res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
      }
       
      //atribuo o objeto de sessão a req.session e defino o header com a sessão do usuario
      req.session = this.sessions[sessionId]
      
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

module.exports = { App, Router, Database, Hashing }