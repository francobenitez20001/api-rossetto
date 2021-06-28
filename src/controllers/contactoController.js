const ContactoService = require('../services/ContactoService');
const Nodemailer = require('../services/NodeMailer');
const {config} = require('../../config/index');

exports.getInfo = async(req,res)=>{
    const contactoService = new ContactoService();
    try {
        const data = await contactoService.get();
        res.status(200).json({
            ok:true,
            data:data || []
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:error
        })
    }
}

exports.sendEmail = async (req,res)=>{
    try {
        const {body} = req;
        let text = `${body.nombre} ${body.apellido} <${body.email}> \n ${body.mensaje}`;
        if(req.body.propiedad){
            text = `${body.nombre} <${body.email}> \n Propiedad: ${req.body.propiedad} \n ${body.mensaje}`
        }
        const nodemailer = new Nodemailer();
        const mailOptions={
            from:body.nombre,
            to:`${config.FROM_USERNAME}`,
            subject:'Consulta desde pagina web',
            text
        };
        nodemailer.send(mailOptions).then(result=>{
            res.status(200).json({
                ok:true
            })
        }).catch(err=>{
            res.status(500).json({
                ok:false,
                error:err
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:error
        })
    }
}

exports.create = async (req,res)=>{
    const contactoService = new ContactoService();
    try {
        const {body} = req;
        const newContacto = await contactoService.create(body);
        res.status(200).json({
            ok:true,
            info:newContacto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:error
        })
    }
}

exports.update = async (req,res)=>{
    const contactoService = new ContactoService();
    try {
        const {body,params:{id}} = req;
        const updateContacto = await contactoService.update(body,id);
        res.status(200).json({
            ok:true,
            info:updateContacto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:error
        })
    }
}