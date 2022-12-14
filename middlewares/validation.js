exports.validation = (resourceSchema) => async (req, res, next) => {
  const resource = req.body
  try {
    await resourceSchema.validate(resource)
    next()
  } catch (e) {
    res.status(400).json({
      field: e.path,
      error: e.errors?.join(', '),
    })
  }
}
