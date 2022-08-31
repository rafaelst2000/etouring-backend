const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const PostsController = require('./controllers/PostsController')
const CommentsController = require('./controllers/CommentsController')
const SessionController = require('./controllers/SessionController')
const login = require('./middleware/login')

/* LOGIN ROUTE */
routes.post('/session', SessionController.login)

/* USERS ROUTES */
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users', login, UserController.update)

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