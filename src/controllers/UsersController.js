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

  async update(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { name, email, password, image } = request.body
    if(!name && !email && !password && !image) return response.status(400).json({ error: 'No data to update'})

    const editedUser = {
      name: name || user.name,
      email: email || user.email,
      password: password ? md5(password) : user.password,
      image: image || user.image,
    }

    await connection('users').where('id', user.id).update(editedUser)
    return response.status(200).json({ message: 'User has been updated' })
  },
}