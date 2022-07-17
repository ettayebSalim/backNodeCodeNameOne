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
//get all produit 
router.post("/showAll", (req, res) => {
    pool.query("SELECT * FROM produit", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//POST
//Create produit
router.post("/add/:Nom/:id_physique_img/:qte/:id_etab", (req, res) => {
    pool.query("INSERT INTO `produit`(`Nom`,`id_physique_img`,`qte`,`id_etab`) VALUES (?,?,?,?)", [        
        req.params.Nom,
        req.params.id_physique_img,
        req.params.qte,
        req.params.id_etab
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//PUT
//Edit produit
router.post("/edit/:id/:Nom/:id_physique_img/:qte/:id_etab", (req, res) => {
    pool.query("UPDATE produit SET Nom=?,id_physique_img=?,qte=?,id_etab=? WHERE id=?", [        
        req.params.Nom,
        req.params.id_physique_img,
        req.params.qte,
        req.params.id_etab,
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
            
        })
})
//delete
//delete produit
router.post("/delete/:id", (req, res) => {
    pool.query("delete from produit WHERE id =?", [        
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);            
        })
})




    
module.exports = router;