
const mongoose = require('mongoose')

const backupschema = new mongoose.Schema({
    dbType: {
        type:String,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    filepath: {
        type:String
    },
     timestamp:{
        type:String,
        required:true
     }
});
module.exports = mongoose.model("Backup",backupschema)