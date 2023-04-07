const http = require('http');
const { App } = require('./libs/App')
const host = '127.0.0.1';
const port = 3000;


const routes = require('./routes')
const routes2 = require('./routes/indexCopy')

// Define your routes and their respective handlers
//router.get('/', (req,res)=>{res.end('hello')})
//routes.define()
//lib de rotas permitir definir rotas novas de maneira simplificada
//ter uma função para infentificar a rota chamada e o method
//verificar se ah parametro e permitir ele ser usado faciç
//ser facil de usar


console.log()

app = new App()
app.useRoute(routes)
app.useRoute(routes2)
app.start(host, port)
