const db = require('../database/database');

class CategoriaModel{
    getAll(){
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM categorias`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    findById(id){
        return new Promise((resolve,reject)=>{
            db.query("SELECT * FROM categorias WHERE idCategoria LIKE ? ",
            [id],(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    findByNombre(categoria){
        return new Promise((resolve,reject)=>{
            db.query("SELECT * FROM categorias WHERE categoria = ? ",
            [categoria],(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    create(body){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_CATEGORIAS_INS_UPD(0,'${body.categoria}','${body.foto}')`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    update(body,id){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_CATEGORIAS_INS_UPD(${id},'${body.categoria}','${body.foto}')`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_CATEGORIAS_DEL(${id})`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = CategoriaModel;