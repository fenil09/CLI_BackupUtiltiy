const {Client} = require('pg')

 const client = new Client({
 user:'postgres',
 host:'localhost',
 database:'nodetest',
 password:'postgres',
 port:5432,
})
client.connect().then(()=>{
 console.log('connected')
}).catch(err=>{
 console.error('connection error',err.stack)
})


async function getdatabases(){
    await client.query("SELECT datname FROM pg_database WHERE datistemplate = false;").then((response)=>{
        return response.rows;
    })
}