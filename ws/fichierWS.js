const { Router } = require('express')
const express = require('express')
const mysql = require('mysql')
var uuidv4 = require('uuid/v4')



const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "pidev"
})

function getConnection(){
    return pool
}



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//GET
//get all fichier 
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM fichier", (err, fichier_rows, fields) => {
        res.status(200)
        res.json(fichier_rows)
    })
})


//GET 
//get fichier by Id
router.get("/showById/:idFichier", (req, res) => {
    pool.query("SELECT * FROM fichier WHERE id = ?",
    [req.params.idFichier]
    , (err, fichier_rows, fields) => {
        res.status(200)
        res.json(fichier_rows)
    })
})


//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//POST
//Create fichier
router.post("/add", (req, res) => {

    pool.query("INSERT INTO fichier ( `type`, `id_physique`, `id_user`) VALUES (?,?,?)", [
        
        req.body.type,
        req.body.id_physique,
        req.body.id_user,
      ],
      (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//PUT
//Edit Fichier
router.post("/edit", (req, res) => {
    pool.query("UPDATE fichier SET type= ?, id_physique= ?, id_user= ? WHERE id= ?", [        
        req.params.type,
        req.params.id_physique,
        req.params.id_user,
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
            
        })
})


//delete
//delete Fichier
router.post("/delete", (req, res) => {
    pool.query("delete from fichier WHERE id =?", [        
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);            
        })
})

    
module.exports = router;