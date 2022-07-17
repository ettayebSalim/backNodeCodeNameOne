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
//get all Users 
router.post("/showAll", (req, res) => {
    pool.query("SELECT * FROM user", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//POST
//Create User
router.post("/add/:nom/:prenom/:email/:cin/:hashedPwd/:numtel/:role", (req, res) => {
    pool.query("INSERT INTO user (`nom`, `prenom`, `email`, `cin`, `hashedPwd`, `numtel`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?)", [        
        req.params.nom,
        req.params.prenom,
        req.params.email,
        req.params.cin,
        req.params.hashedPwd,
        req.params.numtel,
        req.params.role,
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//PUT
//Edit Users
router.post("/edit/:id/:nom/:prenom/:email/:cin/:hashedPwd/:numtel/:role", (req, res) => {
    pool.query("UPDATE user SET nom=?,prenom=?, email=?, cin=?, hashedPwd=?, numtel=?, role=? WHERE id=?", [        
        req.params.nom,
        req.params.prenom,
        req.params.email,
        req.params.cin,
        req.params.hashedPwd,
        req.params.numtel,
        req.params.role,
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
            
        })
})
//delete
//delete User
router.post("/delete/:id", (req, res) => {
    pool.query("delete from user WHERE id =?", [        
        req.params.id
     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);            
        })
})




    
module.exports = router;