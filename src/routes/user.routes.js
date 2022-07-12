const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({email});

  if( !user ) {
    return res.status(404).json({
      message: "User not found!"
    });
  }

  return res.json(user);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if( !name || !email || !password ) {
    return res.status(400).json({
      status: 'Bad request',
      message: "Please, fill all fields!"
    })
  }

  try {
    const userExists = await User.findOne({email});

    if( userExists ) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'Email already exists!'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword
    })
  
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
});

module.exports = router;