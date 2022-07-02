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
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM produit", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//POST
//Create produit
router.post("/add", (req, res) => {
    pool.query("INSERT INTO `produit`(`Nom`,`id_physique_img`,`qte`,`id_etab`) VALUES (?,?,?,?)", [        
        req.body.Nom,
        req.body.id_physique_img,
        req.body.qte,
        req.body.id_etab
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//PUT
//Edit produit
router.put("/edit", (req, res) => {
    pool.query("UPDATE produit SET Nom=?,id_physique_img=?,qte=?,id_etab=? WHERE id=?", [        
        req.body.Nom,
        req.body.id_physique_img,
        req.body.qte,
        req.body.id_etab,
        req.body.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
            
        })
})
//delete
//delete produit
router.delete("/delete", (req, res) => {
    pool.query("delete from produit WHERE id =?", [        
        req.body.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);            
        })
})




    
module.exports = router;