const InmuebleService = require('../services/InmuebleService');
const ImageneService = require('../services/ImagenesService');
const DatoTecnicoService = require('../services/DatoTecnicoService');
const ServiciosService = require('../services/ServicioService');

exports.getAll = async(req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {query:{cantidad,order,desde,destacada}} = req;
        let filtro = null;
        if(destacada && destacada == "1"){//objeto para traer destacadas
            filtro = {
                destacada:true
            }
        }
        const admin = req.header('x-auth-token') ? 1 : 0;
        const inmuebles = await inmuebleService.getAll(admin,desde,cantidad,order,filtro);
        res.status(200).json({
            ok:true,
            inmuebles
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.filtrar = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const idPartido = req.query.idPartido || null;
        const idCiudad = req.query.idCiudad || null;
        const idBarrio = req.query.idBarrio || null;
        const idCategoria = req.query.idCategoria || null;
        const idOperacion = req.query.idOperacion || null;
        const precio = req.query.precio || null;
        const moneda = req.query.moneda || null;
        const minPrecio = req.query.minPrecio || null;
        const maxPrecio = req.query.maxPrecio || null;
        const filtros = {
            idPartido,
            idCiudad,
            idBarrio,
            idCategoria,
            idOperacion,
            precio,
            moneda,
            minPrecio,
            maxPrecio
        }
        const admin = req.header('x-auth-token') ? 1 : 0;
        const {query:{cantidad,order,desde}} = req;
        const inmuebles = await inmuebleService.getAll(admin,desde,cantidad,order,filtros);
        if(inmuebles.length === 0){
            res.status(200).json({
                ok:true,
                inmuebles:[]
            });
            return;
        }
        return res.status(200).json({
            ok:true,
            inmuebles
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.findById = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    const imagenesService = new ImageneService();
    try {
        const {id} = req.params;
        const inmueble = await inmuebleService.getOne(id);
        const imagenes = await imagenesService.getByIdCasa(id);
        res.status(200).json({
            ok:true,
            inmueble,
            imagenes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.create = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    const dtService = new DatoTecnicoService();
    const serviciosService = new ServiciosService();
    try {
        const {general,servicios,tecnicos} = req.body;
        const createBarrio = await inmuebleService.create(general);
        const {ID_INMUEBLE} = createBarrio[0];
        if(ID_INMUEBLE){
            await dtService.create(tecnicos,ID_INMUEBLE);
            await serviciosService.create(servicios,ID_INMUEBLE);
            return res.status(200).json({
                ok:true,
                info:'Propiedad agregada correctamente',
                idInmueble:ID_INMUEBLE
            })
        }
        return res.status(400).json({
            ok:false,
            info:'Problemas al cargar la propiedad'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.update = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    const dtService = new DatoTecnicoService();
    const serviciosService = new ServiciosService();
    try {
        const {body:{general,servicios,tecnicos},params:{id}} = req;
        await inmuebleService.update(general,id);
        await dtService.update(tecnicos,id);
        await serviciosService.update(servicios,id);
        res.status(200).json({
            ok:true,
            info:'Propiedad modificada correctamente'
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.delete = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {params:{id}} = req;
        const deleteBarrio = await inmuebleService.delete(id);
        res.status(200).json({
            ok:true,
            info:deleteBarrio
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.updateEstado = async(req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {params:{id}} = req;
        const updateEstado = await inmuebleService.updateEstado(id);
        res.status(200).json({
            ok:true,
            info:updateEstado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}