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
//get all etablissements 
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM etablissements", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//POST
//Create etablissements
router.post("/add", (req, res) => {
    pool.query("INSERT INTO etablissements (`name`, `adresse`, `type`) VALUES (?, ?, ?)", [        
        req.body.name,
        req.body.adresse,
        req.body.type
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//PUT
//Edit etablissements
router.put("/edit", (req, res) => {
    pool.query("UPDATE etablissements SET name=?,adresse=?,type=? WHERE id=?", [        
        req.body.name,
        req.body.adresse,
        req.body.type,
        req.body.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
            
        })
})
//delete
//delete etablissements
router.delete("/delete", (req, res) => {
    pool.query("delete from etablissements WHERE id =?", [        
        req.body.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);            
        })
})




    
module.exports = router;