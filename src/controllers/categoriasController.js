const CategoriaService = require('../services/CategoriaService');
const CloudStorage = require('../services/CloudStorage');

exports.getAll = async(req,res)=>{
    const categoriaService = new CategoriaService();
    try {
        const categorias = await categoriaService.getAll();
        res.status(200).json({
            ok:true,
            categorias
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

exports.findById = async (req,res)=>{
    const categoriaService = new CategoriaService();
    try {
        const {id} = req.params;
        const categoria = await categoriaService.getOne(id);
        res.status(200).json({
            ok:true,
            categoria
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

exports.findByNombre = async (req,res)=>{
    const categoriaService = new CategoriaService();
    try {
        const {categoria} = req.query
        const cat = await categoriaService.search(categoria);
        res.status(200).json({
            ok:true,
            categoria:cat
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
    const cs = new CloudStorage();
    const categoriaService = new CategoriaService();
    try {
        const link = await cs.upload(req.file);
        const {body} = req;
        body.foto = link;
        const createCategoria = await categoriaService.create(body);
        res.status(200).json({
            ok:true,
            info:createCategoria
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
    const categoriaService = new CategoriaService();
    try {
        const {body,params:{id}} = req;
        body.foto = null;
        if(req.file){
            const cs = new CloudStorage();
            const link = await cs.upload(req.file);
            body.foto = link;
        }
        const updateCategoria = await categoriaService.update(body,id);
        res.status(200).json({
            ok:true,
            info:updateCategoria
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

exports.delete = async (req,res)=>{
    const categoriaService = new CategoriaService();
    try {
        const {params:{id}} = req;
        const deleteCategoria = await categoriaService.delete(id);
        res.status(200).json({
            ok:true,
            info:deleteCategoria
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