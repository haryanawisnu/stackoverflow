const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  id_obj: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  action: Boolean
});

let Answer = mongoose.model('Answer', voteSchema);

module.exports = Answer;
