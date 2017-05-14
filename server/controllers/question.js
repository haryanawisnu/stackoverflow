const Question = require('../models/question');

let answerControllers = {
  showAll: function(req, res) {
    Question.find().populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.reverse());
      }
    });
  },
  showOne: function(req, res) {
    Question.findOne({
      _id: req.params.id
    }).populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  update: (req, res, next) => {
    let question_id = req.params.id;
    let author_id = req.params.userid;
    Question.findOne({
      _id: question_id,
      author: author_id
    }).exec(function(err, result) {
      if (result) {
        Question.update({
          _id: question_id
        }, {
          $set: {
            title: req.body.title || result.title,
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
        res.json({
          success: false,
          err: true,
          message: 'Err Update : Authorized failed'
        });
      }
    });
  },
  create: (req, res, next) => {
    Question.create({
      title: req.body.title,
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
    let question_id = req.params.id;
    let author_id = req.params.userid;
    Question.findOne({
      _id: question_id,
      author: author_id
    }).exec(function(err, result) {
      if (result) {
        Question.findByIdAndRemove(question_id, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Delete : Authorized failed'
        });
      }
    });
  },
  subupdate: (req, res, next) => {
    let question_id = req.body.id;
    let answer_id = req.body.answerid;
    let author_id = req.body.userid;
    Question.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        var ind;
        var temp = result.answer.filter(function(answer, index) {
          if (answer.id == answer_id) {
            ind = index;
            return answer.id;
          }
        })
        if (temp.length == 1) {
          if (temp[0].author == author_id) {
            var arrtemp = result.answer;
            arrtemp[ind].description = req.body.description;
            Question.update({
              _id: question_id
            }, {
              $set: {
                answer: arrtemp
              }
            }, function(err, result) {
              if (result) {
                res.send(result);
              } else {
                res.send(err);
              }
            });
          } else {
            res.json({
              success: false,
              err: true,
              message: 'Err Update : Not can Access'
            });
          }
        } else {
          res.json({
            success: false,
            err: true,
            message: 'Err Update : Answer not found'
          });
        }
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Update : Question not found'
        });
      }
    });
  },
  subcreate: (req, res, next) => {
    let question_id = req.body.id;
    let author_id = req.body.userid;
    Question.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        console.log(result);
        var obj = {};
        obj.id = Math.floor((Math.random() * 99999999999999999) + 1);
        obj.description = req.body.description;
        obj.author = author_id;
        obj.created = new Date;
        result.answer.push(obj);
        Question.update({
          _id: question_id
        }, {
          $set: {
            answer: result.answer
          }
        }, function(err, result) {
          if (result) {
            res.send(result);
          } else {
            res.send(err);
          }
        });
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Answer : Authorized failed'
        });
      }
    });
  },
  subdelete: function(req, res) {
    let question_id = req.params.id;
    let answer_id = req.params.answerid;
    let author_id = req.params.userid;
    console.log(question_id + ',' + answer_id + ',' + author_id);
    Question.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        var ind;
        var temp = result.answer.filter(function(answer, index) {
          if (answer.id == answer_id) {
            ind = index;
            return answer.id;
          }
        })
        if (temp.length == 1) {
          if (temp[0].author == author_id || result.author == author_id) {
            var arrtemp = result.answer.filter(function(answer, index) {
              if (ind != index) {
                return answer;
              }
            })
            Question.update({
              _id: question_id
            }, {
              $set: {
                answer: arrtemp
              }
            }, function(err, result) {
              if (result) {
                res.send(result);
              } else {
                res.send(err);
              }
            });
          } else {
            res.json({
              success: false,
              err: true,
              message: 'Err Delete : Not can Access'
            });
          }
        } else {
          res.json({
            success: false,
            err: true,
            message: 'Err Delete : Answer not found'
          });
        }
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Delete : Question not found'
        });
      }
    });
  }
}

module.exports = answerControllers;
