const jwt = require('jsonwebtoken')
const { ErrorObject } = require('../helpers/error')

exports.userToken = (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      throw new ErrorObject('token missing or invalid', 401)
    }

    req.userId = decodedToken.id
  } catch (error) {
    throw new ErrorObject('token missing or invalid', 401 || 500)
  }
  next()
}
