const { Router } = require('../libs/App')
const router = new Router()
const dashboardController = require('../app/controllers/manager/dashboardController')
const prizeController = require('../app/controllers/manager/prizeController')
const prizeApiController = require('../app/controllers/manager/api/prizeController')
const base = '/manager'

//rota dash
router.get(`${base}`, dashboardController.index)

/*rotas de sorteio*/
router.get(`${base}/sorteios`, prizeController.index)

router.get(`${base}/sorteios/novo`, prizeController.new)
router.post(`${base}/sorteios`, prizeController.insert)

router.get(`${base}/sorteios/editar`, prizeController.edit)
router.post(`${base}/sorteios/editar`, prizeController.update)

router.get(`${base}/sorteios/delete`, prizeController.delete)


const baseApi = '/api/manager'
router.get(`${baseApi}/prizes`, prizeApiController.index)


module.exports = router



