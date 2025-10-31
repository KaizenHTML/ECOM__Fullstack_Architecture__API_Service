const jwt = require('jsonwebtoken');


// Secreto .env
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    

    // Comprobando composición encabezado
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;


    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado. Token no proporcionado.'
        });
    }
    
    // Confirmando existencia de clave secreta
    if (!JWT_SECRET) {
        console.error('ERROR: JWT_SECRET no definida en el entorno.');
        return res.status(500).json({ message: 'Error de configuración del servidor.' });
    }


    // Comprobando Token
    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) {
            return res.status(403).json({
                message: 'Token inválido o expirado.'
            });
        }

        // Agregando ID usuario
        req.user = user; 

        next();
    });
};


module.exports = {

    verifyToken: authenticateToken 
};