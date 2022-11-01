const { getErrorFieldStr, ErrorType } = require("../errormsg_utils");

const autorValidationSchema = {
    nombre: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'nombre')
        },
        isLength: {
            options: { max: 50 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'nombre', '50')
        }
    },
    email: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'email')
        },
        isEmail: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_EMAIL_FIELD, 'email')
        },
        isLength: {
            options: { max: 50 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'email', '50')
        }
    },
    imagen: {
        exists: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'imagen')
        },
        isURL: {
            errorMessage: getErrorFieldStr(ErrorType.ERROR_URL_FIELD, 'image')
        },
        isLength: {
            options: { max: 50 },
            errorMessage: getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'imagen', '50')
        }
    }
}

module.exports = { autorValidationSchema };