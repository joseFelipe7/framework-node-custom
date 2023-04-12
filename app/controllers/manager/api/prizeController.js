const { Database } = require('../../../../libs/App')
const paginationService = require('../../../services/paginationService')
const Prize = require('../../../models/Prize')

module.exports = {
    index:async (req,res)=>{
        try {
            let page     = req.query.page     || 1
            let perPage  = req.query.per_page || 5
            let sort     = req.query.sort     || null
            let filter   = req.query.filter   || ''
            
            startPosition = paginationService.itemStartPage(page, perPage)
            sort = paginationService.querySort(sort)
            filter = paginationService.queryFilter(filter, ['title', 'prize'])
            
            let result = await Prize.list(filter, sort, startPosition, perPage)
            let totalData =  await Prize.countList(filter,sort)
            
            let meta = paginationService.transformMeta(page, perPage, totalData)
            
            return res.status(200).json({meta, data:result})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message:'ocorreu um erro inesperado'})
        }
        
    }
}