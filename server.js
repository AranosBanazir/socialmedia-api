require ('dotenv').config()
const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3001
const routes = require(`./controllers`)
const connection = require('./config/connection')

app.use(express.static(`public`))
app.use(express.json())
app.use(routes)

connection.once('connected', ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server connected at https://localhost:${PORT}`)
    })
})