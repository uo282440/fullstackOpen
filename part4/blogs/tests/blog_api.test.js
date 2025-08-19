
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Mi primer blog',
    author: 'Pablo',
    url: 'https://ejemplo.com',
    likes: 10,
  },
  {
    title: 'Mi segundo blog',
    author: 'Ana',
    url: 'https://ejemplo2.com',
    likes: 5,
  },
  {
    title: 'Mi tercer blog',
    author: 'Juan',
    url: 'https://ejemplo3.com',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs/list')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs initially', async () => {
    const response = await api.get('/api/blogs/list')
    assert.strictEqual(response.body.length, 3)
  })

  test('the first blog is about my first Blog', async () => {
    const response = await api.get('/api/blogs/list')
    const contents = response.body.map(e => e.title)
    assert(contents.includes('Mi primer blog'))
  })

  test('returns 400 for invalid id', async () => {
    const invalidId = '123invalidid'
    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })

  test('returns 404 for non-existing valid id', async () => {
    const validNonExistingId = new mongoose.Types.ObjectId()
    await api.get(`/api/blogs/${validNonExistingId}`).expect(404)
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Mi cuarto blog",
      author: "Pep",
      url: "https://ejemplo2.com",
      likes: 66
    }

    await api
      .post('/api/blogs/add')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/list')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const titles = response.body.map(r => r.title)
    assert(titles.includes('Mi cuarto blog'))
  })

  test('a non valid blog (missing title/author) cannot be added', async () => {
    const newBlog = { likes: 66 }

    await api
      .post('/api/blogs/add')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('fails with status 400 if id is invalid', async () => {
    await api.delete('/api/blogs/123notvalidid').expect(400)
  })

  test('fails with status 404 if blog does not exist', async () => {
    const validNonExistingId = new mongoose.Types.ObjectId()
    await api.delete(`/api/blogs/${validNonExistingId}`).expect(404)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('succeeds in updating likes of an existing blog', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedData = { likes: blogToUpdate.likes + 1 }

    const response = await api
      .put(`/api/blogs/update/${blogToUpdate._id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  })

  test('fails with status 400 if id is invalid', async () => {
    await api
      .put('/api/blogs/update/123invalidid')
      .send({ likes: 100 })
      .expect(400)
  })

  test('fails with status 404 if blog does not exist', async () => {
    const validNonExistingId = new mongoose.Types.ObjectId()
    await api
      .put(`/api/blogs/update/${validNonExistingId}`)
      .send({ likes: 50 })
      .expect(404)
  })
})


after(async () => {
  await mongoose.connection.close()
})

