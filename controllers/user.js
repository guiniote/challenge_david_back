const createHttpError = require('http-errors')
const {
  getOneUserById, createNewUser, getLoginUser, updateUser,
} = require('../services/user')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  // Find user
  getUser: catchAsync(async (req, res, next) => {
    try {
      const response = await getOneUserById(req.params.id)
      endpointResponse({
        res,
        message: 'User retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  // Create user
  createUser: catchAsync(async (req, res, next) => {
    try {
      await createNewUser({
        ...req.body,
      })
      endpointResponse({
        res,
        code: 201,
        message: 'User created successfully',
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [index - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  // Login user
  loginUser: catchAsync(async (req, res, next) => {
    try {
      const response = await getLoginUser(req.body.email, req.body.password)
      endpointResponse({
        res,
        message: 'User retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  // Update user
  putUser: catchAsync(async (req, res, next) => {
    try {
      const response = await updateUser(req.params.id, req.body)
      endpointResponse({
        res,
        message: 'User updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating user] - [index - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
