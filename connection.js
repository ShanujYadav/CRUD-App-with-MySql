const mysql=require('mysql')

//db connection
const db= mysql.createConnection({
    host:"localhost",
    pass:"",
    user:"root",
    database:"ems"
})
db.connect((err)=>{
if(err)
console.log(err.sqlMessage)
else
console.log("db Connected:")

})
module.exports=db