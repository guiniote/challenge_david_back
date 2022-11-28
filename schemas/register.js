const Yup = require('yup')

exports.registerSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Debe tener al menos 6 caracteres')
    .max(40, 'Debe tener como mucho 40 caracteres')
    .required('Obligatorio'),
  surname: Yup.string()
    .min(3, 'Debe tener al menos 6 caracteres')
    .max(40, 'Debe tener como mucho 40 caracteres')
    .required('Obligatorio'),
  email: Yup.string().email('Dirección de mail inválida').required('Obligatorio'),
  password: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial',
    )
    .required('Obligatorio'),
})
