const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const md5 = require('md5');

module.exports = {
  async login(request, response) {
    const { email, password } = request.body

    const user = await connection('users')
      .where({ email, 'password': md5(password) })
      .select('*').first()
    if(!user) {
      return response.status(400).json({ error: 'Wrong credentials'})
    }
    const token = jwt.sign({ user }, 'myJwtSecretKey', { expiresIn: "24h" })
    return response.status(200).json({ message: 'User has been authenticated', token })
  }

}