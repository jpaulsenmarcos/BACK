const { handleHttpError } = require('../utils/handleError')

const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === process.env.API_KEY) {
            next()
        } else {
            handleHttpError(res, 'ERROR_API_KEY', 403)
        }
    } catch (err) {
        handleHttpError(res, 'ERROR_PROCESO_API', 403)
    }
}

module.exports = customHeader