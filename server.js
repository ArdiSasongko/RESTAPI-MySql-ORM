const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = process.env.PORT || 3000
const app = express()
const dotenv = require("dotenv")

dotenv.config()
require("./module/database/connect")

const book = require("./module/routes/bookRoute")

app.use(cors())

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.get("/", (req,res)=> {
    res.status(200).send("Response Success")
    console.log("Response Success")
})

app.use("/book", book)

app.use("*", (req,res)=>{
    res.status(404).send("Cant Find page")
})
app.listen(PORT, () =>{
    console.log(`running in http://localhost:${PORT}`)
})
