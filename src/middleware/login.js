const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'myJwtSecretKey')
    
    request.loggedUser = decode
    next()
  } catch(error) {
    return response.status(401).send({ message: 'Authentication error' })
  }
}