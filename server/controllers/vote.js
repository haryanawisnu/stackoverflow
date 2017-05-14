const Vote = require('../models/vote');

let answerControllers = {
  showAll: function(req, res) {
    Vote.find().populate('author').exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  showOne: function(req, res) {
    Vote.findOne({
      _id: req.params.id
    }).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  update: (req, res, next) => {
    let id = req.params.id;
    Vote.findOne({
      _id: id
    }).exec(function(err, result) {
      if (result) {
        Vote.update({
          _id: id
        }, {
          $set: {
            action: req.body.action || result.action
          }
        }, function(err, result) {
          if (result) {
            res.send(result);
          } else {
            res.send(err);
          }
        });
      } else {
        res.send(err);
      }
    });
  },
  create: (req, res, next) => {
    Vote.create({
      id_obj: req.body.id_obj,
      author: req.body.author,
      action: req.body.action
    }, function(err, result) {
      if (result) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  },
  delete: function(req, res) {
    Vote.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
}

module.exports = answerControllers;
