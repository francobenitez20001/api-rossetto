const express = require('express');
const contactoController = require('../controllers/contactoController');
const validatorParams = require('../middlewares/validatorParams');
const {verifyToken,verifyAdminUser} = require('../middlewares/auth');
const { check } = require('express-validator');
const router = express.Router();

router.get('/',contactoController.getInfo);

router.post('/',[
    check('telefonoPrincipal','El telefono principal es obligatorio').isString(),
    check('whatsapp','whatsapp obligatorio').isString(),
    check('facebook','facebook obligatorio').isString(),
    check('instagram','instagram es obligatorio').isString(),
    check('direccion','direccion obligatoria').isString()
],validatorParams,verifyToken,verifyAdminUser,contactoController.create);

router.put('/:id',[
    check('telefonoPrincipal','El telefono principal es obligatorio').isString(),
    check('whatsapp','whatsapp obligatorio').isString(),
    check('facebook','facebook obligatorio').isString(),
    check('instagram','instagram es obligatorio').isString(),
    check('direccion','direccion obligatoria').isString()
],validatorParams,verifyToken,verifyAdminUser,contactoController.update);

router.post('/sendMail',[
    check('nombre','El nombre es obligatorio').isString(),
    check('email','El email es obligatorio').isString(),
    check('mensaje','El mensaje es obligatorio').isString()
],validatorParams,contactoController.sendEmail);

module.exports = router;