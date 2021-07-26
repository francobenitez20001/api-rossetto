const db = require('../database/database');

class DatoTecnicoModel{
    getAll(){
        return new Promise((resolve,reject)=>{
            db.query("SELECT * FROM datos_tecnicos",(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    findById(id){
        return new Promise((resolve,reject)=>{
            db.query("SELECT * FROM datos_tecnicos WHERE idInmueble = ? ",
            [id],(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    create(body,idInmueble){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_DT_INS_UPD(0,${idInmueble},${body.dormitorios},${body.cochera},${body.pileta},'${body.s_terreno}','${body.s_cubierta}','${body.u_medida}',${body.baños})`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    update(body,idInmueble){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_DT_INS_UPD(${idInmueble},${idInmueble},${body.dormitorios},${body.cochera},${body.pileta},'${body.s_terreno}','${body.s_cubierta}','${body.u_medida}',${body.baños})`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_DT_DEL(${id})`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = DatoTecnicoModel;