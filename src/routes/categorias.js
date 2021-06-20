const express = require('express');
const { check } = require('express-validator');
const router =  express.Router();
const categoriasController = require('../controllers/categoriasController');
const validatorParams = require('../middlewares/validatorParams');
const {verifyToken,verifyAdminUser} = require('../middlewares/auth');
const multer = require('../lib/multer');

router.get("/",categoriasController.getAll);

router.get("/:id",verifyToken,verifyAdminUser,categoriasController.findById);

router.get("/search",categoriasController.findByNombre);

router.post("/",[
  check('categoria','La categoria es obligatoria').isString()
],validatorParams,multer.single('foto'),verifyToken,verifyAdminUser,categoriasController.create);

router.put("/:id",[
  check('categoria','La categoria es obligatoria').isString()
],validatorParams,multer.single('foto'),verifyToken,verifyAdminUser,categoriasController.update);

router.delete("/:id",verifyToken,verifyAdminUser,categoriasController.delete);

module.exports = router;