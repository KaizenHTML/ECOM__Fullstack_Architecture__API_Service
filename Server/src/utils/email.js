const nodemailer = require('nodemailer');


// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: false,
    requireTLS: true
});


// Email Verification
const sendVerificationEmail = async (to, name, verifyUrl) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Verifica tu cuenta - Market Mallorca',

        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">¡Hola, ${name}!</h2>
                <p font-size: 14px> Gracias por registrarte en MarketMallorca. Solo falta un paso para activar tu cuenta. </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyUrl}" 
                       style="background: #003366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                       Verificar mi cuenta
                    </a>
                </div>
                <p style="color: #7f8c8d; font-size: 14px;">
                Este enlace expira en <strong>24 horas</strong>.<br>
                Si no solicitaste esta cuenta, ignora este mensaje.
                </p>
            </div>
        `  
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email de verificación enviado a ${to}`);

    } catch (error) {
        console.log('Error al enviar el correo de verificación:', error);
        throw error;
    }
};


// Email Password Reset
const sendPasswordResetEmail = async (to, resetUrl) => {
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Restablece tu contraseña - Market Mallorca',

        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Restablece tu contraseña</h2>
                <p font-size: 20px;> Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                        style="background: #003366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Restablecer contraseña
                    </a>
                </div>
                <p style="color: #7f8c8d; font-size: 14px;">
                Este enlace expira en <strong>15 minutos</strong>.<br>
                Si no solicitaste este cambio, ignora este mensaje.
                </p>
            </div>
        `  
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email de recuperación enviado a ${to}`);

    } catch(error) {
        console.log('Error al enviar el correo de recuperación', error);
        throw error;
    }
};


module.exports = { 
    sendVerificationEmail, 
    sendPasswordResetEmail 
};    

