
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const fs= require('fs')
const path = require('path')

const s3client = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function UploadtoS3(filepath,bucketname){
    const filestream = fs.createReadStream(filepath)
    const key = path.basename(filepath)

    const command = new PutObjectCommand({
        Bucket: bucketname,
        Key : key,
        Body: filestream,
    })

    try{
         await s3client.send(command)
        console.log("uploaded to S3")
    } catch(err){
        console.error("s3",err)
    }
}

module.exports =  UploadtoS3
