const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'myJwtSecretKey')
    
    req.loggedUser = decode
    next()
  } catch(error) {
    return res.status(401).send({ message: 'Authentication error' })
  }
}