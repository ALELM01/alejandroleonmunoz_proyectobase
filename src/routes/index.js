const express = require('express')
const router = express.Router()

// Database connection
import {connect} from '../database'
import { ObjectID } from 'mongodb'

//Api Rest
// MOSTRAR ALUMNOS
router.get('/api/alumnos', async (req,res) => { 
    const db = await connect()
    const result = await db.collection('alumnos').find({}).toArray()
    res.json(result)
})

// MOSTRAR PROFESORES
router.get('/api/profesores', async (req,res) => { 
    const db = await connect()
    const result = await db.collection('profesores').find({}).toArray()
    res.json(result)
})

// MOSTRAR CENTROS
router.get('/api/centros', async (req,res) => { 
    const db = await connect()
    const result = await db.collection('centros').find({}).toArray()
    res.json(result)
})

// MOSTRAR UN SOLO ALUMNO
router.get('/api/alumnos/:id', async (req, res) => { 
    const { id } = req.params
    const db = await connect()
    const result = await db.collection('alumnos').findOne({_id: ObjectID(id)})
    res.json(result)
})


// MOSTRAR UN SOLO PROFESOR
router.get('/api/profesores/:id', async (req, res) => { 
    const { id } = req.params
    const db = await connect()
    const result = await db.collection('profesores').findOne({_id: ObjectID(id)})
    res.json(result)
})


// MOSTRAR UN SOLO CENTRO
router.get('/api/centros/:id', async (req, res) => { 
    const { id } = req.params
    const db = await connect()
    const result = await db.collection('centros').findOne({_id: ObjectID(id)})
    res.json(result)
})

// INSERTAR DESDE LA API A ALUMNOS
router.post('/api/alumnos', async (req, res) => { //tenemos que tocarlo
    const db = await connect()
    const task = {
        Nombre: req.query.Nombre,
        Apellidos : req.query.Apellidos,
        Centro : parseInt(req.query.Centro),  
        Dirección : {
            Calle : req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio
        }, 
        DNI : req.query.DNI,
        F_Nacimiento : req.query.Fecha,
        Sexo : "Masculino", //modificar zona sexo en edit y aqui
        Repetidor : req.query.Repetidor
    }
    const result = await db.collection('alumnos').insert(task)
    res.json(result)
})

//INSERTAR DESDE LA API A PROFESORES
router.post('/api/profesores', async (req, res) => { 
    const db = await connect()
    const task = {
        Nombre: req.query.Nombre,
        Apellidos : req.query.Apellidos,
        DNI : req.query.DNI,
        F_Nacimiento : req.query.Fecha
    }
    const result = await db.collection('profesores').insert(task)
    res.json(result)
})

//INSERTAR DESDE LA API A CENTROS
router.post('/api/centros', async (req, res) => { 
    const db = await connect()
    const task = {
        Nombre: req.query.Nombre,
        Codigo: parseInt(req.query.Codigo), 
        Direccion : {
            Calle: req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio,
            Localizacion: {
                type: "Point",
                Coordinates: [req.query.lat, req.query.lon]
            }
        }  
    }
    const result = await db.collection('centros').insert(task)
    res.json(result)
})





// ELIMINAR UN ALUMNO
router.delete('/api/alumnos/:id', async (req, res) => { 
    const { id } = req.params
    const db = await connect()
    const result = await db.collection('alumnos').deleteOne({_id: ObjectID(id)})
    res.json({
        message: `ALUMNO ${id} ELIMINADO`,
        result
    })
})


//ELIMINAR UN PROFESOR
router.delete('/api/profesores/:id', async (req, res) => {
    const { id } = req.params
    const db = await connect()
    const result = await db.collection('profesores').deleteOne({_id: ObjectID(id)})
    res.json({
        message: `PROFESOR ${id} ELIMINADO`,
        result
    })
})

//ELIMINAR UN CENTRO
router.delete('/api/centros/:id', async (req, res) => { 
    const { id } = req.params
    const db = await connect()
    const result = await db.collection('centros').deleteOne({_id: ObjectID(id)})
    res.json({
        message: `CENTRO ${id} ELIMINADO`,
        result
    })
})

//MODIFICAR DESDE LA API UN ALUMNO
router.put('/api/alumnos/:id', async (req, res) => {
    const { id } = req.params
    const update = {
        Nombre: req.query.Nombre,
        Apellidos : req.query.Apellidos,
        Centro : parseInt(req.query.Centro),  
        Dirección : {
            Calle : req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio
        }, 
        DNI : req.query.DNI,
        FNacimiento : req.query.Fecha,
        Sexo : "Masculino", //modificar zona sexo en edit y aqui
        Repetidor : req.query.Repetidor
    }
    
    const db = await connect()
    await db.collection('alumnos').updateOne({
        _id: ObjectID(id)}, {$set: update})
    res.json({
        message: `Task ${id} Update`
    })

})

// MODIFICAR DESDE LA API UN PROFESOR
router.put('/api/profesores/:id', async (req, res) => { 
    const { id } = req.params
    const update = {
            nombre: req.query.Nombre,
            apellidos : req.query.Apellidos,
            DNI : req.query.DNI,
            F_Nacimiento : new Date(req.query.Fecha)
        }
    
    const db = await connect()
    await db.collection('profesores').updateOne({
        _id: ObjectID(id)}, {$set: update})
    res.json({
        message: `Task ${id} Update`
    })

})

//MODIFICAR DESDE LA API UN CENTRO
router.put('/api/centros/:id', async (req, res) => { 
    const { id } = req.params
    const update = {
        Nombre: req.query.Nombre,
        Codigo: parseInt(req.query.Codigo), 
        Direccion : {
            Calle: req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio,
            Localizacion: {
                type: "Point",
                Coordinates: [req.query.lat, req.query.lon]
            }
        } 
        
    }
    const db = await connect()
    await db.collection('centros').updateOne({
        _id: ObjectID(id)}, {$set: update})
    res.json({
        message: `Task ${id} Update`
    })

})




// CRUD 

//LISTAR

router.get('/',  async (req, res) => {
    res.render('index')
})

router.get('/alumnos',  async (req, res) => {
    const db = await connect()
    const result = await db.collection('alumnos').find({}).toArray()
    console.log("result: "+JSON.stringify(result));
    res.render('alumnos', {
        result
    })
})

router.get('/profesores',  async (req, res) => {
    const db = await connect()
    const result = await db.collection('profesores').find({}).toArray()
    console.log("result: "+JSON.stringify(result));
    res.render('profesores', {
        result
    })
})

router.get('/centros',  async (req, res) => {
    const db = await connect()
    const result = await db.collection('centros').find({}).toArray()
    console.log("result: "+JSON.stringify(result));
    res.render('centros', {
        result
    })
})


//ELIMINAR
// ELIMINAR UN ALUMNO
router.get('/deletealumno/:id', async (req, res) => { 
    const { id } = req.params 
    const db = await connect()
    await db.collection('alumnos').deleteOne({_id: ObjectID(id)})
   res.redirect('/alumnos')
})

//ELIMINAR UN PROFESOR
router.get('/deleteprofesores/:id', async (req, res) => { 
    const { id } = req.params 
    const db = await connect()
    await db.collection('profesores').deleteOne({_id: ObjectID(id)})
   res.redirect('/profesores')
})

//ELIMINAR UN CENTRO
router.get('/deletecentros/:id', async (req, res) => { 
    const { id } = req.params 
    const db = await connect()
    await db.collection('centros').deleteOne({_id: ObjectID(id)})
   res.redirect('/centros')
})

//AÑADIR
// AÑADIR ALUMNOS
router.get('/addalumnos', async (req, res) => { 
    const db = await connect()
    let repetidorF=false;
    console.log("req.query.Repetidor: "+req.query.Repetidor);
    if(req.query.Repetidor=="Repetidor"){
        repetidorF=true;
    }
    const task = {
        Nombre: req.query.Nombre,
        Apellidos: req.query.Apellidos,
        Centro: parseInt(req.query.Centro),  
        Dirección : {
            Calle: req.query.Calle,
            CodigoPostal: parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio
        },
        DNI :  req.query.DNI,
        FNacimiento :  new Date(req.query.Fecha),
        Sexo : req.query.Sexo,
        Repetidor : repetidorF,
        Examenes: []

    }
    await db.collection('alumnos').insertOne(task)
    res.redirect('/alumnos')
})

//AÑADIR PROFESORES
router.get('/addprofesores', async (req, res) => { 
    const db = await connect()
    const task = {
        nombre: req.query.Nombre,
        apellidos : req.query.Apellidos,
        DNI : req.query.DNI,
        F_Nacimiento : new Date(req.query.Fecha)
    }
    
    await db.collection('profesores').insertOne(task),
    res.redirect('/profesores')
})

//AÑADIR CENTROS
router.get('/addcentros', async (req, res) => {
    const db = await connect()

    const task = {

        Nombre: req.query.Nombre,
        Codigo: parseInt(req.query.Codigo), 
        Direccion : {
            Calle: req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio,
            Localizacion: {
                type: "Point",
                Coordinates: [req.query.lat, req.query.lon]
            }
        } 
    }
    await db.collection('centros').insertOne(task)
    res.redirect('/centros')
})


//EDITAR

//EDITAR UN ALUMNO
router.get('/editalumno/:id', async (req, res) => { 
    const { id } = req.params 
    const db = await connect()
    const result = await db.collection('alumnos').findOne({_id: ObjectID(id)})
    res.render('editalumnos', {
        result
    })   
})

router.get('/addexamen/:id', async (req, res) => { 
    const { id } = req.params 
    
    res.render('introducirexamen', {
        id
    })   
})
//EDITAR UN PROFESOR
router.get('/editprofesores/:id', async (req, res) => { 
    const { id } = req.params 
    const db = await connect()
    const result = await db.collection('profesores').findOne({_id: ObjectID(id)})
    res.render('editprofesores', {
        result
    })   
})

//EDITAR UN CENTRO
router.get('/editcentros/:id', async (req, res) => { 
    const { id } = req.params 
    const db = await connect()
    const result = await db.collection('centros').findOne({_id: ObjectID(id)})
    res.render('editcentros', {
        result
    })   
})


//ACTUALIZAR
router.get('/updatealumnos/:id', async (req, res) => {
    const { id } = req.params
    let repetidorF=false;
    console.log("req.query.Repetidor: "+req.query.Repetidor); 
    if(req.query.Repetidor=="Repetidor"){
        repetidorF=true;
    }
    const update = { 
        Nombre: req.query.Nombre,
        Apellidos : req.query.Apellidos,
        Centro : parseInt(req.query.Centro),  
        Dirección : {
            Calle : req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio
        }, 
        DNI : req.query.DNI,
        FNacimiento :  new Date(req.query.Fecha),
        Sexo : req.query.Sexo,
        Repetidor : repetidorF
    }
    
    const db = await connect()
    await db.collection('alumnos').updateOne({
        _id: ObjectID(id)}, {$set: update})
        res.redirect('/alumnos')
})


// ACTUALIZAR EXAMEN DEL ALUMNO
router.get('/updatealumno/:id/addexamen', async (req, res) => { 
    const { id } = req.params

    console.log(" id: "+ id);

    const update = {
        Asignatura: req.query.Asignatura,
        Fecha:  new Date (req.query.Fecha),
        Nota: parseInt(req.query.Nota)

    }
    console.log(" update: "+ JSON.stringify(update));
    
    const db = await connect();
    
    await  db.collection('alumnos').updateOne(
        { _id: ObjectID(id) },
        { $push: {Examenes:update} }
     )    
        res.redirect('/alumnos')
})


//updateprofesores
router.get('/updateprofesores/:id', async (req, res) => {
    const { id } = req.params
    const update = { 
        nombre: req.query.Nombre,
        apellidos : req.query.Apellidos,
        DNI : req.query.DNI,
        F_Nacimiento : new Date(req.query.Fecha)
    }
      
    const db = await connect()
    await db.collection('profesores').updateOne({
        _id: ObjectID(id)}, {$set: update})
        res.redirect('/profesores')
})


//update centros
router.get('/updatecentros/:id', async (req, res) => {
    const { id } = req.params
    const update = { 
        Nombre: req.query.Nombre,
        Codigo: parseInt(req.query.Codigo), 
        Direccion : {
            Calle: req.query.Calle,
            Numero : parseInt(req.query.Numero),
            CodigoPostal : parseInt(req.query.CodigoPostal),
            Municipio : req.query.Municipio,
            Localizacion: {
                type: "Point",
                Coordinates: [req.query.lat, req.query.lon]
            }
        } 
        
    }
     
    const db = await connect()
    await db.collection('centros').updateOne({
        _id: ObjectID(id)}, {$set: update})
        res.redirect('/centros')
})


// PARTE HIGHCHARTS

//GRÁFICA DE BARRAS
router.get('/grabarras', async (req, res) => {

    const db = await connect()
    const alumnos = await  db.collection('alumnos').aggregate([{
        $group:{
            _id:"$Centro",
            alumno: { $sum: 1}
        }
    }
   ]).toArray();

   const centros = await  db.collection('centros').find().toArray();

    console.log(alumnos)

    alumnos.forEach(alumno => {
        
        centros.forEach(centro => {
            if(alumno._id===centro.Codigo){
                alumno._id=centro.Nombre
            }
        });
    });

    res.render('Graficabarras', {
        alumnos
    })
}); 

module.exports = router