
const {backupMongo} = require('../services/mongo')

async function runBackup(uri){

    try{
        const backuppath = await backupMongo(uri)
        console.log("backup stored at: ",backuppath)
    }
    catch(Error){
        console.error("backup failed",Error.message)
    }

}

module.exports = runBackup;