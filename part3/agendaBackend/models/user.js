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
    name: {type: String, minLength: 3, required: true},
    number: { 
    type: String, 
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} no es un número de teléfono válido (ejemplo válido: 09-1234556)`
    },
    required: true
  }
  })

  module.exports = mongoose.model('User', userSchema)