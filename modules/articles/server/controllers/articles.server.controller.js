'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var article = req.article;
  var sesionDate = req.article.sesionDate;
  var finiquito = req.article.lastDate;
  article.sesion = req.body.sesion;
  article.title = req.body.title;
  article.content = req.body.content;
  article.mayorSummary = req.body.mayorSummary;
  article.chiefSummary = req.body.chiefSummary;
  article.contributorSummary = req.body.contributorSummary;
  article.department = req.body.department;
  article.dateSesion = req.body.dateSesion;
  article.state = req.body.state;
  article.lastDate = req.body.lastDate;

  if (article.sesionDate == null) {
    article.sesionDate = sesionDate;
  }

  if (article.lastDate == null) {
    article.lastDate = finiquito;
  }

  /*if(article.state == null) {
    if(article.state == 'Pendiente') {
      article.state = 'Asignado a Departamento';
    }
    if(article.state == 'Asignado a Departamento') {
      article.state = 'Asignado a Colaborador';
    }
    if(article.state == 'Asignado a Colaborador') {
      article.state = 'Aprobado por Colaborador';
    }
  /*if(article.state == 'Pendiente') {
    article.state = 'Asignado a Departamento';
  }
  if(article.state == 'Pendiente') {
    article.state = 'Asignado a Departamento';
  }
  if(article.state == 'Pendiente') {
    article.state = 'Asignado a Departamento';
  }
}*/

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  if (req.user.roles == 'user,secretaria') {
    Article.find({ $or: [{ 'state': "Aprobado por Alcalde" }, { 'state': "Terminado" }, { 'state': "Pendiente" }] }).sort('-created').populate('user', 'displayName').exec(function (err, articles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles);
      }
    });

  }
  else if (req.user.roles == 'admin,user') {
    Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles);
      }
    });


  }
  else if (req.user.roles == 'user') {
    Article.find({ $and: [{ 'department': req.user.department }, { $or: [{ 'state': "Asignado a Colaborador" }, { 'state': "Mejorar Colaborador" }] }] }).sort('-created').populate('user', 'displayName').exec(function (err, articles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles);
      }
    });

  }
  else if (req.user.roles == 'user,jefe,admin') {
    Article.find({ $and: [{ 'department': req.user.department }, { $or: [{ 'state': "Asignado a Departamento" }, { 'state': "Aprobado por Colaborador" }, { 'state': "Asignado a Colaborador" }, { 'state': "Mejorar Colaborador" }, { 'state': "Mejorar Departamento" }] }] }).sort('-created').populate('user', 'displayName').exec(function (err, articles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles);
      }
    });
  }

};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};