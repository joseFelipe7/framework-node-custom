const { Router } = require('../libs/App')
const router = new Router()
const homeController = require('../app/controllers/homeController')
const base = '/'

router.get(`${base}`, homeController.index)
router.get(`${base}ss`, homeController.indexss)

module.exports = router

























// const routes = {
//   'GET': {
//     '/': (req, res) => {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end('Hello World!');
//     },
//     '/users': (req, res) => {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end('List of users');
//     },
//     '/users/:id': (req, res) => {
//       const userId = req.url.split('/')[2];
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end(`User with ID ${userId}`);
//     }
//   },
//   'POST': {
//     '/users': (req, res) => {
//       res.writeHead(201, { 'Content-Type': 'text/plain' });
//       res.end('New user created');
//     }
//   },
//   'PUT': {
//     '/users/:id': (req, res) => {
//       const userId = req.url.split('/')[2];
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end(`User with ID ${userId} updated`);
//     }
//   },
//   'DELETE': {
//     '/users/:id': (req, res) => {
//       const userId = req.url.split('/')[2];
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end(`User with ID ${userId} deleted`);
//     }
//   }
// };