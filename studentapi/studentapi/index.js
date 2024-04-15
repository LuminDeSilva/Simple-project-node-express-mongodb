const express = require('express')
const app = express()
const port=8080
//middleware handle JSON
app.use(express.json())

//HTTP GET
app.get('/',(req,res)=>{
    res.status(200)
    res.send("Hello Express !")
})

//HTTP POST
app.post('/',(req,res)=>{
    let {name} = req.body
    let {age} = req.body
    res.status(200).send(`Name is, ${name}, age is ${age}`)
})

//HTTP DELETE
app.delete('/:id',(req,res)=>{
    let {id} = req.params
    res.status(200).send(`The IT student with id ${id} is deleted`)
})

//HTTP PUT
app.put('/:id',(req,res)=>{
    let {id} = req.params
    let {name} = req.body
    res.status(200).send(`The IT student with id ${id} is updated, now name is ${name}`)
})

app.listen(port,()=>{
    console.log("The MYAPI is running on a port ",port)
})