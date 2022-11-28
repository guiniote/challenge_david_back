const Yup = require('yup')

exports.loginSchema = Yup.object({
  email: Yup.string().email('Dirección de mail inválida').required('Obligatorio'),
  password: Yup.string().required('Obligatorio'),
})
