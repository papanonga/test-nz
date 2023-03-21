const router = require('express').Router()
const foodController = require('../controllers/food.controller')


router.get('/', foodController.findAll)
router.get('/name/:name', foodController.findByName)
router.post('/', foodController.insert)
router.put('/', foodController.updateByName)
router.delete('/', foodController.remove)



module.exports = router