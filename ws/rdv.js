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
//get all rendvous  
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM rdv", (err, rdv_rows, fields) => {
        res.status(200)
        res.json(rdvs_rows)
    })
})




//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create Rendvous
router.post("/add", (req, res) => {

    pool.query("INSERT INTO `rdv`(`date`,`id_user`,`id_etab`) VALUES (?,?,?)", [
        
        req.body.date,
        req.body.id_user,
        req.body.id_etab,
  

     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})





    
module.exports = router;