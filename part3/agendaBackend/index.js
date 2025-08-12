
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const User = require('./models/user')


app.use(cors())
app.use(express.static('dist'))

//modification of tiny for exercise 3.8
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ')
}))

app.use(express.json())



//ENDPOINTS

app.get('/api/persons', (request, response) => {
    //response.send(persons)
    User.find({}).then( people => {
      response.json(people)
    })
})

app.get('/info', (request, response) => {
    const message = `Phonebook has info for ${persons.length} people`
    const actualDate = Date()
    response.send(`<p>${message}</p> <br/> <p>${actualDate}</p>`)
})

app.get('/api/persons/:id', async (request, response) => {
  //const id = Number(request.params.id)
  const person = await User.findById(request.params.id)

    if (person) {    
        response.json(person)  
    } else {    
        response.status(404).end()  
    }
})

app.delete('/api/persons/:id', (request, response, next) => {
  User.findByIdAndDelete(request.params.id)
  .then(person => {
    response.status(204).end()
  })
  .catch(error => next(error))
})


app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new User ({
    name: body.name,
    number: body.number
  })

  //const selectedPerson = User.find({name: body.name})
  const existingPerson = await User.findOne({ name: body.name })

  if (!existingPerson) {

    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))

  } else {
    
      const updatedPerson = await User.findByIdAndUpdate(
        existingPerson._id,
        { number: body.number },
        { new: true, runValidators: true }
      )
      return response.json(updatedPerson)
  }

  
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  const user = {
    name: body.name,
    number: body.number,
  }

  User.findByIdAndUpdate(request.params.id, {name, number}, { new: true, runValidators: true, context: 'query'})
    .then(updatedUser => {
      response.json(updatedUser)
    })
    .catch(error => next(error))
})


//middleware for non existent endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') { 
    return response.status(400).json({ error: error.message })  
  }

  next(error)
}

// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)