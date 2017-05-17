const express = require('express');
const router = express.Router();
var Vote = require('../controllers/vote');

router.get('/', Vote.showAll);
router.get('/:id', Vote.showOne);
router.post('/', Vote.create);
router.put('/:id', Vote.update);
router.delete('/:id', Vote.delete);

module.exports = router;
