const express = require('express');
const router = express.Router();
var Question = require('../controllers/question');


router.get('/', Question.showAll);
router.get('/:id', Question.showOne);
router.post('/', Question.create);
router.post('/sub', Question.subcreate);
router.put('/:id/:userid', Question.update);
router.put('/sub', Question.subupdate);
router.delete('/:id/:userid', Question.delete);
router.delete('/sub/:id/:answerid/:userid', Question.subdelete);

module.exports = router;
