const nodemailer = require('nodemailer');

module.exports.mailer = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS
    },
    tls: {rejectUnauthorized: false}
});

module.exports.forgot = (e_mail, code) => {
    return {
        to: e_mail,
        from : process.env.GMAIL_EMAIL,
        subject: 'Reset password',
        html: `
            <h1>Forgot password?</h1>
            <p>If not, ignore this email.</p>
            <p>Otherwise, this your password reset code - ${code}</p> 
        `
    }
}
