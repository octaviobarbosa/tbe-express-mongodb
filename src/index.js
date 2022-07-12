require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes')
const commentRoutes = require('./routes/comment.routes')

const app = express();
const port = 3000;

app.use(express.json())

const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;
console.log('mongoURL', mongoURL);
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))	
  .catch(err => console.log(err));

app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

app.use('*', (req, res)  => res.status(404).json({
  error: 'Not found',
}));

app.listen(port, () => console.log(`Server listening on port ${port}` )) 
