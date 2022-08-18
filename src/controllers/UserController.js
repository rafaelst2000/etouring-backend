const connection = require('../database/connection')
const md5 = require('md5');

module.exports = {
  async create(request, response) {
    const { name, email, password, image } = request.body
    if(!name || !email || !password) return response.status(400).json({ error: 'Bad request'})

    await connection('users').insert({ name, email, password: md5(password), image })
    return response.status(201).json({ message: "User has been created" })
  },

  async index(request, response) {
    const { id } = request.params
    let users = []
    if(id) users = await connection('users').where('id', id).select('*')
    else users = await connection('users').select('*')
    
    return response.json(users)
  },

  async delete(request, response) {
    return response.json({ message: 'Not implemented' })
  },

  async update(request, response) {
    return response.json({ message: 'Not implemented' })
  },
}