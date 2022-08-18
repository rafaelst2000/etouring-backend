const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const PostsController = require('./controllers/PostsController')

/* USER ROUTES */
routes.post('/users', UserController.create)
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.index)
routes.delete('/users/:id', UserController.delete)
routes.put('/users/:id', UserController.update)

/* POST ROUTES */
routes.post('/posts', PostsController.create)
routes.get('/posts', PostsController.index)


module.exports = routes