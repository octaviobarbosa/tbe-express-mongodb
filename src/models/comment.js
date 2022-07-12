const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Comment = mongoose.model('comment', CommentSchema);