const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/', userController.index)
router.put('/catalog', userController.addCatalog)
router.get('/catalog', userController.getCatalogs)
router.post('/catalog/:id', userController.updateCatalog)
router.delete('/catalog/:id', userController.deleteCatalog)

router.put('/banner', userController.addBanner)
router.get('/banner', userController.getBanners)
router.post('/banner/:id', userController.updateBanner)
router.delete('/banner/:id', userController.deleteBanner)

router.put('/menu', userController.addMenu)
router.get('/menu', userController.getMenus)
router.delete('/menu/:id', userController.deleteMenu)

router.get('/catalogMenus/:id', userController.getCatalogMenus)
router.get('/menu/:id', userController.getMenuById)

module.exports = router;