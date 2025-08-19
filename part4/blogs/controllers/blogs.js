const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/list', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
  /*Blog.find({})
    .then(blogs => {
      res.json(blogs)
    })*/
})

blogRouter.post('/add', (req, res) => {
  const blog = new Blog(req.body)
  
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({ error: 'title and author are required' })
  }

  
  blog.save()
  .then(result => {
    res.status(201).json(result)
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


