const express = require('express')
const routes = express.Router()

const UsersController = require('./controllers/UsersController')
const PostsController = require('./controllers/PostsController')
const CommentsController = require('./controllers/CommentsController')
const SessionsController = require('./controllers/SessionsController')
const login = require('./middleware/login')

/* LOGIN ROUTE */
routes.post('/sessions', SessionsController.login)

/* USERS ROUTES */
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.index)
routes.post('/users', UsersController.create)
routes.put('/users', login, UsersController.update)

/* POSTS ROUTES */
routes.get('/posts', PostsController.index)
routes.post('/posts', login, PostsController.create)
routes.put('/posts/:id', login, PostsController.update)
routes.delete('/posts/:id', login, PostsController.delete)

/* COMMENTS ROUTES */
routes.post('/comments', login, CommentsController.create)
routes.put('/comments/:id', login, CommentsController.update)
routes.delete('/comments/:id', login, CommentsController.delete)


module.exports = routes