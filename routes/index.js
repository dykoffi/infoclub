var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var data = require('../data/accueil')
  var applis = data.activites()
  var formation = data.Formation()
  res.render('accueil', { title: 'x-work | Acceuil', host: req.hostname, app: applis, formation:formation });
});

router.get('/inscription/participants', function (req, res, next) {
  res.render('inscription/participants', { title: 'Club info | Inscription Participants', host: req.hostname });
});

router.get('/inscription/formateurs', function (req, res, next) {
  res.render('inscription/formateurs', { title: 'Club info | Inscription Formateurs', host: req.hostname });
});

module.exports = router;
