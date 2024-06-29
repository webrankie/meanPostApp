const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, PATCH");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({message: "Post created successfully."});
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: '00001', title: 'First Sever-side post', content: 'This is coming from a server!'},
    {id: '00002', title: 'Second Sever-side post', content: 'This second post which is coming from a server!'},
  ]
  res.status(200).json({
    message: `Posts fetched successfully!.`,
    posts: posts
  });
});


module.exports = app;
