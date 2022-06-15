const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 3000

const personRoutes = require('./routes/personRoutes')

app.use(
    express.urlencoded({extended: true,}),
)

app.use(
    express.json(),
)

app.use("/person", personRoutes)    


app.get('/', (req, res) => res.json({data: 'Hello Word'}))

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@nodecluster.fqhqi.mongodb.net/firstNodeDB?retryWrites=true&w=majority`)
    .then(
        app.listen(port, () => console.log(`Aplicação rodando na porta: ${port}! \nConectados ao MongoDB`))
    )
    .catch((err) => {
        console.log(err)
    })


//7HX7S58zCnSsyTVx
