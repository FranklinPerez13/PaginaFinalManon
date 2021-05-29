const express = require('express');
const router = express.Router();
const clienteDB = require('../modelos/modeloClientes');



// SELECT 
router.get('/select', async (req, res) => {
    try {
        clienteDB.find({}, (err, results) => {
            res.render('pages/clientes', {
                listaCliente: results
            })
            console.log(results);
        })
    } catch (err) {
        res.send(json({
            message: error.message
        }))
    }
});



//Insert
// router.get('/add', (req, res) => {
//     res.render('pages/bodyFormulario')
// })

router.post('/add', (req, res) => {
    
    try {
        clienteDB.find({email: req.body.Correo}, (err, results) => {
            if(!results.length > 0) {
                try {
                    const newCliente = new clienteDB({
                        name: req.body.Nombres,
                        email: req.body.Correo,
                        apellido: req.body.Apellido,
                        contraseña: req.body.Contraseña
                    })
                    
                    newCliente.save()
                    console.log('Cliente Agredado!')  
                } catch (err) {  
                   
                }
            } 
console.log(req.body)
            //enviar correo

            console.log('Email Enviado')           
            res.render('pages/formulario')
        })
    } catch (err) {
        
    }
})


//
router.get('/home', (req, res) => {
    res.render('pages/index')
})

router.get('/form', (req, res) => {
    res.render('pages/formulario')
})

module.exports = router;