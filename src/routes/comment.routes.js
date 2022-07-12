const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, comment } = req.body;

  if( !email || !password || !comment) {
    return res.status(400).json({
      status: 'Bad request',
      message: "Please, fill all fields!"
    })
  }

  const user = await User.findOne({email});

  const checkPassword = user ? await bcrypt.compare(password, user.password) : false;

  if( !user || !checkPassword ) {
    return res.status(400).json({
      message: "User not found or bad credentials"
    });
  }

  const commentExists = await Comment.findOne({userId: user._id, comment});

  if( commentExists ) {
      return res.status(400).json({
        message: "Comment already exists!"
      });
  }

  const newComment = await Comment.create({
    userId: user._id,
    comment,
  });


  return res.json(newComment)
})


module.exports = router;