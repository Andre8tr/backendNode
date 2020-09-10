var express = require('express')

var ArticleController = require('../controllers/articleController')

var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart({uploadDir: './uploads'})
router.get('/home', ArticleController.home)
router.post('/test', ArticleController.test)
router.post('/saveArticle', ArticleController.saveArticle)
router.get('/getArticle/:id?', ArticleController.getArticle)
router.get('/getArticles',  ArticleController.getArticles)
router.put('/updateArticle/:id', ArticleController.updateArticle)
router.delete('/deleteArticle/:id', ArticleController.deleteArticle)
router.post('/uploadImage/:id',multipartMiddleware ,ArticleController.uploadImage)

module.exports = router
