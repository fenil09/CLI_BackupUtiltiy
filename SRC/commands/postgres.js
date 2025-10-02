// backing up a single database in postgres database.

const {exec} = require('child_process')
const path = require('path')
const backupmodel = require('../models/Backup')
function backupPostgres(dbName, user,outputDir){
    const timestamp = new Date().toISOString().replace(/[:.]/g,"-")
    const outputPath = path.join(outputDir, `postgres-backup-${dbName}-${timestamp}.sql`)
    const command = `pg_dump -U ${user} -d ${dbName} -F c -b -v -f "${outputPath}"`

    exec(command, {env: {...process.env,PGPASSWORD:process.env.PGPASSWORD}},(error,stdout,stderr)=>{
 
        if(error){
            console.error(`Backup failed: ${error.message}`)
            return 
        }
        if(stderr){
            console.error(`Backup stderr: ${stderr}`)
        }
        console.log(`Backup completed successfully, file stored at: ${outputPath}`)
        backupmodel.create({
            dbType:"postgresql",
            status:"success",
            filepath:outputPath,
            timestamp : timestamp
        }).then(()=>{
            console.log("backup saved to backupdatabase")
        }).catch(()=>{
            console.error("error saving to mongoDB",error);
        })

    })
}
module.exports = backupPostgres;