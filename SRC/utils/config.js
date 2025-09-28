
require("dotenv").config()

const mongoose= require('mongoose')

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Backup database connected")
    })
}

module.exports = connectDB