const { Router } = require('../libs/App')
const router = new Router()
const dashboardController = require('../app/controllers/manager/dashboardController')
const prizeController = require('../app/controllers/manager/prizeController')
const prizeApiController = require('../app/controllers/manager/api/prizeController')
const authManager = require('../middlewares/AuthManager')

const base = '/manager'


router.get(`${base}/login`, dashboardController.index)
router.post(`${base}/login`, dashboardController.login)

//rota dash
router.get(`${base}`, dashboardController.dashboard, authManager)

/*rotas de sorteio*/
router.get(`${base}/sorteios`, prizeController.index, authManager)

router.get(`${base}/sorteios/novo`, prizeController.new, authManager)
router.post(`${base}/sorteios`, prizeController.insert, authManager)

router.get(`${base}/sorteios/editar`, prizeController.edit, authManager)
router.post(`${base}/sorteios/editar`, prizeController.update, authManager)

router.get(`${base}/sorteios/delete`, prizeController.delete, authManager)


const baseApi = '/api/manager'
router.get(`${baseApi}/prizes`, prizeApiController.index)


module.exports = router



