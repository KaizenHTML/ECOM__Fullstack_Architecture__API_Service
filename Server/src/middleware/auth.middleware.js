const jwt = require('jsonwebtoken');


// Clave secreta
const JWT_SECRET = process.env.JWT_SECRET;


// Autenticando Token
const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    
    // Comprobando la composición del encabezado
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;


    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado. Token no proporcionado.'
        });
    }
    
    if (!JWT_SECRET) {
        console.error('ERROR: JWT_SECRET no definida en el entorno.');
        return res.status(500).json({ 
            message: 'Error de configuración del servidor.' 
        });
    }


    // Comprobando Token
    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Token expirado.'
                });
            }
            
            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({
                    message: 'Token inválido.'
                });
            }
            
            return res.status(403).json({
                message: 'Token inválido o expirado.'
            });
        }
        
        // Guardando contenido del token en la solicitud
        req.user = user;

        next();
    });
};


module.exports = {

    verifyToken: authenticateToken 
};