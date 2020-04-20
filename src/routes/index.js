const express = require('express')
const router = express.Router()

// Database connection
import {connect} from '../database'
import { ObjectID } from 'mongodb'

//Api Rest
// MOSTRAR ALUMNOS
router.get('/api/alumnos', async (req,res) => { //tocado
    const db = await connect()
    const result = await db.collection('alumnos').find({}).toArray()
    res.json(result)
})

// MOSTRAR PROFESORES
router.get('/api/profesores', async (req,res) => { //tocado
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
router.get('/api/centros/:id', async (req, res) => { //tocado
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
        Centro : req.query.Centro,  
        Dirección : {
            Calle : req.query.Calle,
            Numero : req.query.Numero,
            CodigoPostal : req.query.CodigoPostal,
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
router.post('/api/profesores', async (req, res) => { //tenemos que tocarlo
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
router.post('/api/centros', async (req, res) => { //tenemos que tocarlo
    const db = await connect()
    const task = {
        Nombre: req.query.Nombre,
        Codigo: req.query.Codigo, 
        Direccion : {
            Calle: req.query.Calle,
            Numero : req.query.Numero,
            CodigoPostal : req.query.CodigoPostal,
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
        Centro : req.query.Centro,  
        Dirección : {
            Calle : req.query.Calle,
            Numero : req.query.Numero,
            CodigoPostal : req.query.CodigoPostal,
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
router.put('/api/profesores/:id', async (req, res) => { //TOCAR VALORES UPDATE
    const { id } = req.params
    const update = {
        //METER VALORES PROFESORES
    }
    const db = await connect()
    await db.collection('profesores').updateOne({
        _id: ObjectID(id)}, {$set: update})
    res.json({
        message: `Task ${id} Update`
    })

})

//MODIFICAR DESDE LA API UN CENTRO
router.put('/api/centros/:id', async (req, res) => { //TOCAR VALORES CENTROS
    const { id } = req.params
    const update = {
        //METER VALORES CENTROS
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
router.get('/deletealumno/:id', async (req, res) => { //tocado
    const { id } = req.params 
    const db = await connect()
    await db.collection('alumnos').deleteOne({_id: ObjectID(id)})
   res.redirect('/alumnos')
})

//ELIMINAR UN PROFESOR
router.get('/deleteprofesores/:id', async (req, res) => { //tocado
    const { id } = req.params 
    const db = await connect()
    await db.collection('profesores').deleteOne({_id: ObjectID(id)})
   res.redirect('/profesores')
})

//ELIMINAR UN CENTRO
router.get('/deletecentros/:id', async (req, res) => { //tocado
    const { id } = req.params 
    const db = await connect()
    await db.collection('centros').deleteOne({_id: ObjectID(id)})
   res.redirect('/centros')
})

//AÑADIR
// AÑADIR ALUMNOS
router.get('/addalumnos', async (req, res) => { //tocado
    const db = await connect()
    let repetidorF=false;
    console.log("req.query.Repetidor: "+req.query.Repetidor);
    if(req.query.Repetidor=="Repetidor"){
        repetidorF=true;
    }
    const task = {
        Nombre: req.query.Nombre,
        Apellidos: req.query.Apellidos,
        Centro: req.query.Centro,  
        Dirección : {
            Calle: req.query.Calle,
            CodigoPostal: req.query.CodigoPostal,
            Municipio : req.query.Municipio
        },
        DNI :  req.query.DNI,
        FNacimiento :  new Date(req.query.Fecha),
        Sexo : req.query.Sexo,
        Repetidor : repetidorF,
        Examanes: []

    }
    await db.collection('alumnos').insertOne(task)
    res.redirect('/alumnos')
})

//AÑADIR PROFESORES
router.get('/addprofesores', async (req, res) => { //TOCAR
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
router.get('/addcentros', async (req, res) => { //tocado
    const db = await connect()

    const task = {

        Nombre: req.query.Nombre,
        Codigo: req.query.Codigo, 
        Direccion : {
            Calle: req.query.Calle,
            Numero : req.query.Numero,
            CodigoPostal : req.query.CodigoPostal,
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
router.get('/editalumno/:id', async (req, res) => { //tocado
    const { id } = req.params 
    const db = await connect()
    const result = await db.collection('alumnos').findOne({_id: ObjectID(id)})
    res.render('editalumnos', {
        result
    })   
})

router.get('/addexamen/:id', async (req, res) => { //tocado
    const { id } = req.params 
    
    res.render('introducirexamen', {
        id
    })   
})
//EDITAR UN PROFESOR
router.get('/editprofesores/:id', async (req, res) => { //tocado
    const { id } = req.params 
    const db = await connect()
    const result = await db.collection('profesores').findOne({_id: ObjectID(id)})
    res.render('editprofesores', {
        result
    })   
})

//EDITAR UN CENTRO
router.get('/editcentros/:id', async (req, res) => { //tocado
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
        Centro : req.query.Centro,  
        Dirección : {
            Calle : req.query.Calle,
            Numero : req.query.Numero,
            CodigoPostal : req.query.CodigoPostal,
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
        Nota: req.query.Nota

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
      
    const db = await connect()//tocado
    await db.collection('profesores').updateOne({
        _id: ObjectID(id)}, {$set: update})
        res.redirect('/profesores')
})


//update centros
router.get('/updatecentros/:id', async (req, res) => {//TOCANDOLO
    const { id } = req.params
    const update = { 
        Nombre: req.query.Nombre,
        Codigo: parseINt(req.query.Codigo), 
        Direccion : {
            Calle: req.query.Calle,
            Numero : req.query.Numero,
            CodigoPostal : req.query.CodigoPostal,
            Municipio : req.query.Municipio,
            Localizacion: {
                type: "Point",
                Coordinates: [req.query.lat, req.query.lon]
            }
        } 
        
    }
     
    const db = await connect()//tocado
    await db.collection('centros').updateOne({
        _id: ObjectID(id)}, {$set: update})
        res.redirect('/centros')
})


// Highcharts

// Gráfica de lineas 

router.get('/grafica', async (req, res) => {
    res.render('grafica')
})

// Publicaciones de cada año por género 
router.get('/datos-grafica', async (req, res) => {
    const db = await connect()
    const result =  await db.collection('libros').aggregate([
        { 
            $group:{
                _id:{
                    gender: "$genero",
                    year:{
                        $year: "$fechaEdicion"
                    }
                },
                total: { $sum: 1 }
            }
        },
        {
            $sort:{
                "_id.gender": 1,
                "_id.year": 1
            }
        }
    ]).toArray()
    
    res.json(result)
})

router.get('/circle', async (req,res) => {
    const db = await connect()
    const result = await db.collection('libros').aggregate( [
        {
          $bucket: 
            {
                groupBy: "$edad",                        
                boundaries: [5, 8, 11, 15, 18, 19],
                output: {
                    "count": {$sum: 1}
                }
            }
        }
    ]).toArray()
    res.render('Cgrafica', {
        result
    })
})

router.get('/barras', async (req, res) => {
    res.render('barras')
})

router.get('/barras-find', async (req, res) => {
    const editorial = req.query.editorial
    const db = await connect()
    const result = await db.collection('libros').aggregate( [
        {
            $match: {
                editorial: editorial
            }
        },
        {
            $group: {
                _id: {
                    genero: "$genero",
                    year:{$year:"$fechaEdicion"}
    
                },
                total: {$sum:1}
            }
        },
        {
            $sort:{
                "_id.genero":1,
                "_id.years":1
            }
        }
    ]).toArray()
    const allYears = result.map(item => item._id.year)
    let years = allYears.filter((year, index, self) => self.indexOf(year) === index)
    const allGenders = result.map(item => item._id.genero)
    let genders = allGenders.filter((gender, index, self) => self.indexOf(gender) === index)
    let oryears = years.sort()

    // Format result
    let resultData = []
    genders.forEach(gender => { 
        resultData = [
            ...resultData,
            {
                name: gender,
                data: years.map(year => {
                    const item = result.find(item => item._id.year === year)
                    return item == null ? 0 : item.total
                })
            }
        ]
        
    });
    console.log(resultData)
    res.render('HGbarras', {
        result: JSON.stringify(resultData),
        oryears
    })
})

// Mapa
router.get('/mapa', async (req, res) => {
    const db = await connect()
    const result = await db.collection('tiendas').find({}).toArray()
    // Format result
    let resultData = []
    result.forEach(item => {
        resultData = [
            ...resultData, 
            {
                name: item.nombre,
                lat: parseFloat(item.localizacion.coordinates[1].toFixed(6)),
                lon: parseFloat(item.localizacion.coordinates[0].toFixed(6))
            }
        ]
    });
    console.log(resultData)
    res.render('mapa', {
        result: JSON.stringify(resultData)
    })
})

// Consultas

// Usando switch
router.get('/case', (req, res) => {
    res.render('case')
})

router.get('/case2', async (req, res) => {
    const genero = req.query.genero
    const precio = parseInt(req.query.precio)
    const db = await connect()
    const result = await db.collection('libros').aggregate( [
        {
            $match: {
                genero: genero,
                precio: {$lt: precio}
            }
        },
       {
         $project:
           {
             "titulo" : 1,
             "puntuacion" :
             {
               $switch:
                 {
                   branches: [
                     {
                       case: { $eq : [ "$premios.nominados", 0 ] },
                       then: "0 estrellas"
                     },
                     {
                        case: { $and : [ { $ne : [ "$premios.nominados", 0 ] }, {$eq: ["$premios.wins",0]}]},
                        then: "1 estrella"
                      },
                      {
                         case: { $and : [ {$ne: ["$premios.wins",0]}, {$lte: ["$premios.wins", 3]}]},
                         then: "2 estrellas"
                       },
                       {
                          case: { $and : [ {$gt: ["$premios.wins", 3]}]},
                          then: "3 estrellas"
                        }
                   ],
                   default: "No cumple las condiciones"
                 }
              }
           }
        }
        
    ]).toArray()
    res.render('tcase', {
        result
    })
})

//usando unwind
router.get('/unwind', async (req, res) => {
    const db = await connect()
    const result = await db.collection('libros').aggregate( [
        {
            $unwind: "$autores"
        },
        {
            $group: {
                _id: "$autores",
                total: {$sum:1}
            }
        },
         {
             $sort: { _id:1}
         }  
    ]).toArray()
    res.render('unwind', {
        result
    })
})

//usando lookup
router.get('/join0', (req, res) => {
    res.render('formuJoin')
})

router.get('/join', async (req, res) => {
    const genero = req.query.genero
    const precio = parseInt(req.query.precio)
    const edad = parseInt(req.query.edad)
    const db = await connect()
    const result = await db.collection('libros').aggregate( [
        {
            $lookup:
              {
                from: "tiendas",
                localField: "editorial",
                foreignField: "nombre",
                as: "docs"
              }
         },
         {
             $match: {
                 genero: genero,
                 edad: {$lte: edad},
                 precio: {$lte: precio},
             }
         },
         {
             $project: {
                 titulo: 1,
                 edad:1,
                 precio:1,
                 "docs.nombre":1,
                 "docs.localizacion.coordinates":1
             }
         }
    ]).toArray()
    console.log(genero,edad,precio)
    res.render('join', {
        result
    })
})
module.exports = router