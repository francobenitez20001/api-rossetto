const express = require('express');
const router =  express.Router();
const categoriasController = require('../controllers/categoriasController');
const {verifyToken,verifyAdminUser} = require('../middlewares/auth');
const multer = require('../lib/multer');

router.get("/",categoriasController.getAll);

router.get("/:id",verifyToken,verifyAdminUser,categoriasController.findById);

router.get("/search",categoriasController.findByNombre);

router.post("/",multer.single('foto'),verifyToken,verifyAdminUser,categoriasController.create);

router.put("/:id",multer.single('foto'),verifyToken,verifyAdminUser,categoriasController.update);

router.delete("/:id",verifyToken,verifyAdminUser,categoriasController.delete);

module.exports = router;