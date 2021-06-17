const { config } = require('../../config');
const db = require('../database/database');

class InmuebleModel{
    getAll(admin,desde,cantidad,order,filtros){
        let query = `SELECT ID_INMUEBLE,
        OPERACION,
        CATEGORIA,
        PARTIDO,
        CIUDAD,
        BARRIO,
        DIRECCION,
        DESCRIPCION,
        ESTADO_PROPIEDAD,
        MONEDA_PROPIEDAD,
        PRECIO,
        MOSTRAR_ESTADO,
        PROPIEDAD_ACTIVA,
        IF(TIENE_LUZ=1 ,'SI','NO') AS LUZ,
        IF(TIENE_INTERNET=1 ,'SI','NO') AS INTERNET,
        IF(TIPO_GAS='N' ,'NATURAL','ENVASADO') AS GAS,
        IF(TIPO_AGUA='P' ,'POZO','CORRIENTE') AS AGUA,
        IF(TIENE_CALEFACCION=1 ,'SI','NO') AS CALEFACCION,
        IF(TIENE_TELEFONO=1 ,'SI','NO') AS TELEFONO,
        DORMITORIOS,
        IF(COCHERA=1 ,'SI','NO') AS COCHERA,
        IF(PILETA=1 ,'SI','NO') AS PILETA,
        SUPERFICIE_TOTAL,
        SUPERFICIE_CUBIERTA,
        UNIDAD_MEDIDA,
        HEADER `;
        if(!admin){
          query += `FROM ${config.dbName}.rs_inmuebles_web WHERE 1=1 `;
        }else{
            query += `FROM ${config.dbName}.rs_inmuebles_todas WHERE 1=1 `;
        }
        if(filtros){
            if(filtros.idPartido){
                query += `AND ID_PARTIDO = ${filtros.idPartido} `;
            }
            if(filtros.idCiudad){
                query += `AND ID_CIUDAD = ${filtros.idCiudad} `;
            }
            if(filtros.idBarrio){
                query += `AND ID_BARRIO = ${filtros.idBarrio} `;
            }
            if(filtros.idCategoria){
                query += `AND ID_CATEGORIA = ${filtros.idCategoria} `;
            }
            if(filtros.idOperacion){
                query += `AND ID_OPERACION = ${filtros.idOperacion} `;
            }
            if(filtros.moneda){
                query += `AND MONEDA_PROPIEDAD = '${filtros.moneda}' `;
            }
            if(filtros.minPrecio && filtros.maxPrecio){
                query += `AND PRECIO BETWEEN ${filtros.minPrecio} AND ${filtros.maxPrecio} `;
            }
        }
        if (order == "normal") {
          query+=`ORDER BY ID_INMUEBLE DESC `;
        } else if (order == "high") {
          query+=`ORDER BY PRECIO DESC `;
        } else if (order == "low") {
          query+=`ORDER BY PRECIO ASC `;
        }
        query += `LIMIT ${desde},${cantidad}`;
        return new Promise((resolve,reject)=>{
            db.query(query,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    findById(id){
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM ${config.dbName}.rs_inmuebles_todas WHERE ID_INMUEBLE = ?`,[id],(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    create(body){
        return new Promise((resolve,reject)=>{
            db.query("CALL SP_INMUEBLES_INS_UPD(0,?, ? , ?, ?, ? , ?, ?, ?, ?, ?, ?,0)",
            [
                body.idOperacion,
                body.idCategoria,
                body.idPartido,
                body.idCiudad,
                body.idBarrio,
                body.direccion,
                body.descripcion,
                body.estado,
                body.moneda,
                body.precio,
                body.mostrarEstado
            ],(err,res,fields)=>{
                if(err) reject(err);
                db.query(`SELECT MAX(ID_INMUEBLE) as ID_INMUEBLE FROM ${config.dbName}.rs_inmuebles_todas`,(error, filas, celdas) => {
                    if (!error) {
                      resolve(filas);
                    } else {
                      reject(error);
                    }
                })
            })
        })
    }

    update(body,id){
        return new Promise((resolve,reject)=>{
            db.query("CALL SP_INMUEBLES_INS_UPD(?,?, ? , ?, ?, ? , ?, ?, ?, ?, ?, ?,0)",
            [
	            id,
                body.idOperacion,
                body.idCategoria,
                body.idPartido,
                body.idCiudad,
                body.idBarrio,
                body.direccion,
                body.descripcion,
                body.estado,
                body.moneda,
                body.precio,
                body.mostrarEstado
            ],(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    updateEstado(id){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_INMUEBLES_CAMBIAR_ESTADO_EN_WEB(${id})`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            db.query(`CALL SP_INMUEBLES_DEL(${id})`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = InmuebleModel;