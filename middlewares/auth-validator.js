import{ check } from 'express-validator'
import { validarCampos } from './validate-values.js'
import { emailExist } from '../helpers/db-validators.js'
import { processFileUpload } from './process-file-upload.js'
import { delteFileOnError } from './delete-file-on-error.js'

export const registerValidator = [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El apellido es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "No es un email válido").isEmail(),
    check("email").custom(emailExist),
    check("password","La contraseña debe tener al menos 8 caracteres").isLength({
        min: 8
    }),
    validarCampos,
    processFileUpload,
    delteFileOnError
]

export const loginValidator = [
    check("email", "No es un email váldo").optional().isEmail(),
    check("password", "La contraseña debe tener al menos 8 caracteres"),
    check("username", "El usuario no es válido").optional(),

    validarCampos,
]