const http = require('http');
const path = require('path');
const { App } = require('./libs/App')
const host = '127.0.0.1';
const port = 3000;


const routes = require('./routes')

app = new App()
app.viewFolder(path.join('app', 'views_ui'))
app.publicFolder(path.join('public'))
app.useRoute(routes)
app.start(host, port)
