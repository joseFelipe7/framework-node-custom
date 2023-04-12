// const { Router } = require('../libs/App')
// const router = new Router()
// const middleware = (req,res,next)=>{
//     /*--*/
//     next()
// }
// router.get('/', (req, res) => { /*...*/ }, middleware)
// module.exports = router


// const { Router } = require('../libs/App')
// const router = new Router()
// router.get('/', (req, res) => { 
//     res.redirect('/home')
// // })
// // module.exports = router

// const { Hashing } = require('./libs/App')

// let textHash = 'be2b650ac4eb26e0e4b41f357dc1def9e7f5c063d6072bbb06f3ca94538f0946'
// Hashing.compare('123',textHash) //saida: true






















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