const connection = require('../database/connection')
const md5 = require('md5');

module.exports = {
  async create(request, response) {
    const { user_id, description } = request.body
    await connection('posts').insert({ user_id, description })
  
    return response.status(201).json({ message: "Post has been created" })
  },

  async index(request, response) {
    const { page = 1 } = request.query
    const [count] = await connection('posts').count()
    const posts = await connection('posts')
      .limit(5).offset((page - 1) * 5)
      .select('*')

    response.header('X-Total-Count', count['count(*)'])
    return response.json(posts)
  },
  
}