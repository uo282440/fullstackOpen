const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


  const userSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  module.exports = mongoose.model('User', userSchema)