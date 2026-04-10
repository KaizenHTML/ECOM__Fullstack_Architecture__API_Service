const jwt = require('jsonwebtoken');


// Secret Key
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    
    // Checking Header Composition
    const token = authHeader?.replace('Bearer ', '');


    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado. Token no proporcionado.'
        });
    }
    
    if (!JWT_SECRET) {
        return res.status(500).json({ 
            message: 'Error de configuración del servidor.' 
        });
    }


    // Verifying Token
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
        
        // Saving Token Content In Request
        req.user = user;


        // Going to the controller
        next();
    });
};


module.exports = {
    verifyToken: authenticateToken 
};