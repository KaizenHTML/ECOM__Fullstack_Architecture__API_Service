const db = require('../config/db.config');

const setDbUserContext = async (req, _res, next) => {
  
    if (req.user && req.user.id) {

        try {
            // Injecting the ID Into the Postgres Session
            await db.query(`SET app.current_user_id = '${req.user.id}'`);

        } catch (error) {
            console.error("ERRORES CAPTURADOS: ", error);
        }
    }

    // Continuing to Controller
    next(); 
};

module.exports = setDbUserContext;