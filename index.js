const path = require('path');
const { App } = require('./libs/App')
const host = '127.0.0.1';
const port = 3000;


const routes = require('./routes')
const routesLogin = require('./routes/login')
const routesRegister = require('./routes/register')
const routesHome = require('./routes/home')

app = new App()

app.viewFolder(path.join('app', 'views'))
app.publicFolder(path.join('public')) 
//routes
// app.useRoute(routes) 
app.useRoute(routesLogin)  
app.useRoute(routesRegister)  
app.useRoute(routesHome) 

app.start(host, port)
