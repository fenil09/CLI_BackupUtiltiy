const connectDB = require('./SRC/utils/config')
connectDB()


const runBackup = require('./SRC/commands/backup')
const runBackupPostgres = require('./SRC/commands/postgres')
//runBackup("mongodb://127.0.0.1:27017/backend")
runBackupPostgres('nodetest','postgres', './backups')
