const express=require('express')
const app=express()
const engine=require('express-handlebars').engine
const db=require('./model/connection')

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//default page
app.get("/",(req,res)=>{
    res.render('home')
})
// create user
app.post("/addUser",(req,res)=>{
    const user={id:req.body.id,Name:req.body.name,Salery:req.body.salery,City:req.body.city}
    let sql='insert into `employee` set ?'
    db.query(sql,user,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
//showUser
app.get("/showUser",(req,res)=>{
    let sql="select * from `employee`"
    db.query(sql,(err,result)=> {
    if(err) throw err
    else 
      res.render('show',{list:result})
    })
})

// show particuler user        
app.get("/showUser/:id",(req,res)=>{
    let sql=`select * from employee where id='${req.params.id}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.render('upd',{list:result})
    })
})
// delete user
app.get("/deleteUser/:id",(req,res)=>{
    let sql=`delete from employee where id='${req.params.id}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.redirect('/showUser')
    })
})
// updateUser
app.post("/updateUser",(req,res)=>{

    //const user={Name:req.body.name,Salery:req.body.salery,City:req.body.city}
  let ID= `${req.body.id}`
  console.log(ID)
    let sql =`update employee set Name='${req.body.name}',Salery='${req.body.salery}',City='${req.body.city}' where id=${ID}`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
const port=process.env.port||3000
app.listen(port,()=>console.log(`server is runnig at ${port}`))