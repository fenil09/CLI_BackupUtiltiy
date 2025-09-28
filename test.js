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
 getfrompostgres()
 Updatepostgres('fenilahir16@gmail.com')
}).catch(err=>{
 console.error('connection error',err.stack)
})

async function Insertpostgres(){
   await client.query("INSERT INTO nodeusers (name,email) VALUES ('fenil','fenilahir16@gmail.com'),('avi','patel88@gmail.com')").then(res => {
    console.log('Data inseted successfully')
   })
}

async function getfrompostgres(){
    await client.query('SELECT * FROM nodeusers').then(res => {
     console.log(res.rows)
    })
}

