const connection = require('../database/connection')
const md5 = require('md5');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query
    const [count] = await connection('posts').count()
    const posts = await connection('posts')
      .limit(5).offset((page - 1) * 5)
      .select('*')

    response.header('X-Total-Count', count['count(*)'])
    return response.json(posts)
  },

  async create(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { description } = request.body
    if(!description) return response.status(400).json({ error: 'No description to create post'})

    await connection('posts').insert({ user_id: user.id, description })
  
    return response.status(201).json({ message: "Post has been created" })
  },

  async delete(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { id } = request.params
    const post = await connection('posts')
      .select('*')
      .where({ id })
      .first()
    if(!post) return response.status(400).json({ error: 'No post with this id'})

    if(post.user_id !== user.id) return response.status(403).json({ error: 'This post is not from this user'})

    await connection('posts').where('id', post.id).delete()
    return response.status(200).json({ message: 'Post has been deleted' })
  },

  async update(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { description } = request.body
    if(!description) return response.status(400).json({ error: 'No description to update post'})

    const { id } = request.params
    const post = await connection('posts')
      .select('*')
      .where({ id })
      .first()
    if(!post) return response.status(400).json({ error: 'No post with this id'})

    if(post.user_id !== user.id) return response.status(403).json({ error: 'This post is not from this user'})

    await connection('posts').where('id', post.id).update({ ...post, description })
    return response.status(200).json({ message: 'Post has been updated' })
  },
  
}