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
//get all panier
router.post("/showAllpanier", (req, res) => {
    pool.query("SELECT * FROM panier", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//POST
//Create panier
router.post("/add/:nomProd/:date", (req, res) => {
    pool.query("INSERT INTO `Panier`(`nomProd`,`date`)"
    + " VALUES (?,?)", [        
        
        req.params.nomProd,
        req.params.date
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//PUT
//Edit Panier
router.post("/edit/:id/:nomProd/:date", (req, res) => {
    pool.query("UPDATE etablissements SET nomProd=?,date=? WHERE id=?", [        
        req.params.nomProd,
        req.params.date,
       
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
            
        })
})
//delete
//delete Panier
router.post("/delete/:id", (req, res) => {
    pool.query("delete from Panier WHERE id =?", [        
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);            
        })
})




    
module.exports = router;