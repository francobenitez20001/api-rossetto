const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    //leer token del header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if(!token) return res.status(401).json({ok:false,msg:'Permiso no valido'})

    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado.usuario;
    } catch (error) {
        res.status(401).json({ok:false,msg:'token no valido'})
    }
}

module.exports = verifyToken;