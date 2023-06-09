const path = require('path');
const { App } = require('./libs/App')
const host = 'localhost';
const port = 3000;


const routes = require('./routes')
const routesLogin = require('./routes/login')
const routesRegister = require('./routes/register')
const routesHome = require('./routes/home')
const routesManager = require('./routes/manager')

app = new App()

app.viewFolder(path.join('app', 'views'))
app.publicFolder(path.join('public')) 
//routes
app.useRoute(routesLogin)  
app.useRoute(routesRegister)  
app.useRoute(routesHome) 
app.useRoute(routesManager) 

app.start(host, port)
