const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ErrorObject } = require('../helpers/error')
const { Users } = require('../database/models')

// Get one user from an email
exports.getOneUser = async (userEmail) => {
  try {
    let user = {}
    await Users.findOne({
      where: { email: userEmail },
    }).then((userData) => {
      user = {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: userData.password,
        address: userData.address,
        telephone: userData.telephone,
      }
    })
    return user
  } catch (error) {
    return null
  }
}

// Get one user from an id
exports.getOneUserById = async (userId) => {
  try {
    let user = {}
    await Users.findByPk(userId).then((userData) => {
      user = {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: userData.password,
        address: userData.address,
        telephone: userData.telephone,
      }
    })
    return user
  } catch (error) {
    return null
  }
}

// Create new user in database
exports.createNewUser = async (newUser) => {
  try {
    const userExist = await this.getOneUser(newUser.email)
    if (userExist) {
      throw new ErrorObject('user already exist', 409)
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(newUser.password, saltRounds)
      await Users.create({
        ...newUser,
        password: passwordHash,
      })
    }
    return
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

// Login user
exports.getLoginUser = async (userEmail, userPassword) => {
  try {
    const user = await this.getOneUser(userEmail)
    const passwordOK = user === null ? false : await bcrypt.compare(userPassword, user.password)
    if (!(user && passwordOK)) {
      throw new ErrorObject('invalid email or password', 401)
    }
    const userToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7,
      },
    )

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      token: userToken,
    }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

// Update user
exports.updateUser = async (userId, userData) => {
  try {
    const user = await Users.findByPk(userId)
    if (!user) {
      throw new ErrorObject('No user found', 404)
    }
    await user.update({ ...userData })
    return
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
