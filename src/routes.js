const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const PostsController = require('./controllers/PostsController')
const SessionController = require('./controllers/SessionController')
const login = require('./middleware/login')

/* LOGIN ROUTE */
routes.post('/session', SessionController.login)

/* USER ROUTES */
routes.post('/users', UserController.create)
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.index)
routes.put('/users', login, UserController.update)

/* POST ROUTES */
routes.post('/posts', PostsController.create)
routes.get('/posts', PostsController.index)


module.exports = routes