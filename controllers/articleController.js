var Article = require('../models/articulo')
var fs = require('fs')
var controller = {
  home: function(req, res) {
    return res.status(200).send({
      message: 'Soy home'
    })
  },

  test: function(req, res) {
    return res.status(200).send({
      message: 'Soy test'
    })
  },

  saveArticle : function(req, res){
    var article = Article()
    var params = req.body
    article.name = params.name
    article.description = params.description
    article.category = params.category
    article.price = params.price
    article.state = true
    article.image = null

    article.save((err, articleStored) => {
      if(err || !articleStored){
        return res.status(500).send('Se ha producido un error interno')
      }else{
        return res.status(200).send({article: articleStored})
      }
    })
  },

  getArticle: function(req, res){
    var articleId = req.params.id
    Article.findById(articleId, (err, article) => {
      if(err || !article){
        return res.status(500).send('Ha ocurrido un error al buscar un articulo')
      }else{
        return res.status(200).send({
          article: article
        })
      }
    })
  },

  getArticles: function(req, res) {
    Article.find({state: true}).exec((err, articles) => {
      if(err || !articles){
        return res.status(500).send('Error al obtener los articulos')
      }else{
        return res.status(200).send({
          articles: articles
        })
      }
    })
  },

  updateArticle: function(req, res) {
    var articleId = req.params.id
    var updatedArticle = req.body
    Article.findByIdAndUpdate(articleId, updatedArticle, {new: true}, (err, articleUpdated) => {
      if(err || !articleUpdated){
        return res.status(500).send('Ocurrio un error al actualizar el articulo')
      }else{
        return res.status(200).send({
          article: articleUpdated
        })
      }
    })
  },

  deleteArticle: function(req, res){
    var articleId = req.params.id
    Article.findByIdAndRemove(articleId, (err, articleRemoved) => {
      if(err || !articleRemoved){
        return res.status(500).send('No se ha encontrado el documento')
      }else{
        return res.status(200).send({
          article: articleRemoved
        })
      }
    })
  },
  uploadImage: function(req, res){
    var articleId = req.params.id
    var fileName = 'Imagen no subida'
    if(req.files){

      var filePath = req.files.image.path
      var fileSplit = filePath.split('/')
      var fileName = fileSplit[1]
      var extSplit = fileName.split('.')
      var fileExt = extSplit[1]

      if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
        Article.findByIdAndUpdate(articleId, {image: fileName}, (err, articleUpdated) => {
          if(err || !articleUpdated){
            return res.status(500).send({
              message: 'El archivo no pudo ser subida'
            })
            }else {
              return res.status(200).send({
                info: req.files,
                more: articleUpdated
              })
          }
        })
    }
    else{
      fs.unlink(filePath, (err) => {
        return res.status(500).send({
          message: 'La extension no es valida'
        })
      })
    }
  }else{
    console.log('Nada');
  }
}
}


module.exports = controller
