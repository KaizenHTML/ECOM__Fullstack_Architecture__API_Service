// Middleware para manejar errores en funciones asíncronas
const errorHandler = (fn) => (req, res, next) => {

    Promise.resolve(fn(req, res, next)).catch(next)
};


module.exports = errorHandler;