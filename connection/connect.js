
  const mongoose = require('mongoose')
  const url = 
  "mongodb+srv://vicky:vicky0001@cluster0.yazrt.mongodb.net/codebrew?retryWrites=true&w=majority"
  // "mongodb://localhost:27017/codebrew";
  mongoose.connect(url, { useNewUrlParser: true })
 
  const connect = mongoose.connection;
  module.exports = {connect}
