const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, PATCH");
  next();
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
