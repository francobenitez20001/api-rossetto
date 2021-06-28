const nodemailer = require('nodemailer');
const {config} = require('../../config/index');

class Nodemailer{
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:config.ACCOUNT_HOST,
            port:config.ACCOUNT_PORT,
            secure:true,
            service:'gmail',
            auth:{
                user:config.ACCOUNT_USERNAME,
                pass:config.ACCOUNT_PASSWORD
            }
        });
        this.transporter.verify().then(()=>{
            console.log('Transporter configurado');
        })
    }

    send(mailOptions){
        return new Promise((resolve,reject)=>{
            this.transporter.sendMail(mailOptions,(err,res)=>{
                if(err) return reject(err.message);
                return resolve(res);
            })
        })
    }
}

module.exports = Nodemailer;
