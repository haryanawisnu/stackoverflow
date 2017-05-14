const Answer = require('../models/answer');

let answerControllers = {
  showAll: function(req, res) {
    Answer.find().populate('author').exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  showOne: function(req, res) {
    Answer.findOne({
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
    Answer.findOne({
      _id: id
    }).exec(function(err, result) {
      if (result) {
        Answer.update({
          _id: id
        }, {
          $set: {
            description: req.body.description || result.description
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
    Answer.create({
      description: req.body.description,
      author: req.body.author,
      created: new Date
    }, function(err, result) {
      if (result) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  },
  delete: function(req, res) {
    Answer.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
}

module.exports = answerControllers;
