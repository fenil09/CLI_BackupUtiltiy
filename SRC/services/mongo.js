
 const {exec} = require('child_process') // -> would be allowing the node system to run commands like mongodump
 const path = require('path') // -> path module to handle the filesystem operations
 const fs = require('fs') //-> creating and structuring directories
const { stdout, stderr } = require('process')
const backupModel = require('../models/Backup')
const UploadtoS3 = require('../utils/S3')
 async function backupMongo(dburi) { //-> the execution would be asynchronous so we want to know if the backup is successfull or a failure that is why
    // our backupmongo function would be returing us a promise, 
     return new Promise((resolve, reject)=> {
        // creating the timestamp first
        const timestamp = new Date().toISOString().replace(/[:.]/g,"-")
        const outputdir = path.join(__dirname,"../../backups"); // 
        const backupfile = path.join(outputdir,`archive.gz_${timestamp}`);

          // we are going to make sure that backup folder is existing

           fs.mkdirSync(outputdir,{recursive:true}) // -> this would make the output directory first and the run mongodump, like a synchronous operation.
           // 
         
           // building the command for backup

            const command = `mongodump --uri="${dburi}" --archive="${backupfile}" --gzip`; // we changed the way our command was producing the backup file we removed the timestamped folder and instead generated an archived file inside the backup folder directly.
            // The only reason to do this is because aws s3 when upload is invoke it needs a file that it can push to the s3 bucket, we cannot provide a folder to it.
        // -> mongodump is a built in backup till that mongodb provides, so this command needs an url of the database that needs the backup
        // so our command would be having the uri that the user passes and then it is going to generate an output folder with the backup files

            exec(command, (err,stdout,stderr) => {
                if(err){
                    return reject(new Error(stderr || err.message))
                }
                else{
                    console.log("backup completed",outputdir)
                    UploadtoS3(backupfile,process.env.S3_BUCKET_NAME)
                    resolve(outputdir)
                }
               
            })

            // -> exec would be running our mongodump command in shell, it would be taking two things the command that needs to be executed and a callback function.
            // The callback would be having err parameter which would be checking if the backup is successfull or not,
            // then it would be having a standared output which is the result when the command executes successfully and 
            // a error parameter which is holding the error from the command itself.

            // The flow is when we pass the command to be executed it is going to return a result which is either rejected or resolved
            // successfully meaning first there is an error in the nodejs execution it is going to show us that error,
            // and the STderr would be holding the error that is giving by mongdump command.
            // If no error then we are going to get the folder path where the backup is stored.

            

     })
    
    }
    module.exports = backupMongo;
