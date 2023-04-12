const { Router } = require('../libs/App')
const router = new Router()
const dashboardController = require('../app/controllers/manager/dashboardController')
const prizeController = require('../app/controllers/manager/prizeController')
const prizeApiController = require('../app/controllers/manager/api/prizeController')
const base = '/manager'
router.get(`${base}`, dashboardController.index)

router.get(`${base}/premios`, prizeController.index)
router.post(`${base}/premios`, prizeController.insert)
router.put(`${base}/premios`, prizeController.update)
router.delete(`${base}/premios`, prizeController.delete)


const baseApi = '/api/manager'
router.get(`${baseApi}/prizes`, prizeApiController.index)


module.exports = router



