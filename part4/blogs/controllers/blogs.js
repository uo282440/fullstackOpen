const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

// Middleware para extraer el token
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

// Middleware para validar el token y adjuntar el usuario
const userExtractor = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }
  
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

blogRouter.get('/list', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
  /*Blog.find({})
    .then(blogs => {
      res.json(blogs)
    })*/
})

/*
blogRouter.post('/add', (req, res) => {
  const blog = new Blog(req.body)
  
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({ error: 'title and author are required' })
  }

  
  blog.save()
  .then(result => {
    res.status(201).json(result)
  })
  
})*/
blogRouter.post('/add', tokenExtractor, userExtractor, (req, res) => {
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({ error: 'title and author are required' })
  }

  // Ahora puedes usar la información del usuario del token
  // por ejemplo, para asociar el blog al usuario que lo crea
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: req.user.id // Aquí asocias el blog al usuario
  })
  
  blog.save()
  .then(result => {
    res.status(201).json(result)
  })
  .catch(error => {
    res.status(500).json({ error: 'internal server error' })
  })
})

blogRouter.delete('/remove/:id', async (req, res) => {
   try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)

    if (!deletedBlog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

blogRouter.put('/update/:id', async (req, res) => {
  const { likes, title, author, url } = req.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes, title, author, url },
      { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedBlog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    res.json(updatedBlog)
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

module.exports = blogRouter


