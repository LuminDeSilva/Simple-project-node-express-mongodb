const express = require('express')
const app = express()
const stuRoute = require('./routes/studentroute')
const port=8080

app.use(express.json())

app.use('/student',stuRoute)

app.listen(port,()=>{
    console.log("The API is running on a port ",port)
})