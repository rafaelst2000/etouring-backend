const connection = require('../database/connection')
const md5 = require('md5')
const fetch = require('node-fetch')

const validateEmail = async (email) => {
  const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_VALIDATION_KEY}&email=${email}`);
  const body = await res.json();
  const { is_valid_format } = body

  return is_valid_format.value
}

module.exports = {
  async create(request, response) {
    const { name, email, password, image } = request.body
    if(!name || !email || !password) return response.status(400).json({ error: 'Bad request'})

    const isValid = await validateEmail(email)
    if(!isValid) return response.status(400).json({ error: 'Email is not valid or is alredy in use'})

    const isAlredyInUse = await connection('users').where('email', email).select('email').first()
    if(isAlredyInUse) return response.status(400).json({ error: 'Email is not valid or is alredy in use'})

    await connection('users').insert({ name, email, password: md5(password), image })
    return response.status(201).json({ message: "User has been created" })
  },

  async index(request, response) {
    const { id } = request.params
    let users = []
    if(id) users = await connection('users').where('id', id).select('*')
    else users = await connection('users').select('*')
    
    if(id && users.length === 0) return response.status(404).json({ error: 'No user found with this id'})
    return response.json(users)
  },

  async update(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { name, email, password, image } = request.body
    if(!name && !email && !password && !image) return response.status(400).json({ error: 'No data to update'})

    const isValid = await validateEmail(email)
    if(!isValid) return response.status(400).json({ error: 'Email is not valid or is alredy in use'})

    const userWithThisEmail = await connection('users').where('email', email).select('*').first()
    if(userWithThisEmail && (user.id !== userWithThisEmail.id)) return response.status(400).json({ error: 'Email is not valid or is alredy in use'})

    const editedUser = {
      name: name || user.name,
      email: email || user.email,
      password: password ? md5(password) : user.password,
      image: image || user.image,
    }

    await connection('users').where('id', user.id).update(editedUser)
    return response.status(200).json({ message: 'User has been updated' })
  },

  async delete(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    await connection('users').where('id', user.id).delete()
    return response.status(200).json({ message: 'User has been deleted' })
  },
}