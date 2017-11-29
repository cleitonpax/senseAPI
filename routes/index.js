var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sense API' });
});

/* GET all sense. */
router.get('/sense', function (req, res, next) {
    var db = require('../db');
    var Sense = db.Mongoose.model('sense', db.SenseSchema, 'sense');
    Sense.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
});
/* GET ONE sense. */
router.get('/sense/:id', function (req, res, next) {
  var db = require('../db');
  var Sense = db.Mongoose.model('sense', db.SenseSchema, 'sense');
  Sense.find({ _id: req.params.id }).lean().exec(function (e, docs) {
      res.json(docs);
      res.end();
  });
});

/* POST ONE Sense. */
router.post('/sense/', function (req, res, next) {
    var db = require('../db');
    var Sense = db.Mongoose.model('sense', db.SenseSchema, 'sense');
    var newSense = new Sense({ name: req.body.name, email: req.body.email });
    newSense.save(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(newSense);
        res.end();
    });
});

/* PUT ONE Sense. */
router.put('/sense/:id', function (req, res, next) {
    var db = require('../db');
    var Sense = db.Mongoose.model('sense', db.SenseSchema, 'sense');
    Sense.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
        res.end();
    });
});

/* DELETE ONE Sense. */
router.delete('/sense/:id', function (req, res, next) {
    var db = require('../db');
    var Sense = db.Mongoose.model('sense', db.SenseSchema, 'sense');
    Sense.find({ _id: req.params.id }).remove(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json({success: true});
        res.end();
    });
});

module.exports = router;
