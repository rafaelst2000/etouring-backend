const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const PostsController = require('./controllers/PostsController')
const SessionController = require('./controllers/SessionController')
const login = require('./middleware/login')

/* LOGIN ROUTE */
routes.post('/session', SessionController.login)

/* USER ROUTES */
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users', login, UserController.update)

/* POST ROUTES */
routes.get('/posts', PostsController.index)
routes.post('/posts', login, PostsController.create)
routes.put('/posts/:id', login, PostsController.update)
routes.delete('/posts/:id', login, PostsController.delete)


module.exports = routes