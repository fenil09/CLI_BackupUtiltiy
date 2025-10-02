const { default: Choices } = require('inquirer/lib/objects/choices');


async function main(){
    const inquirer = require('inquirer')
const backupMongo = require('./SRC/services/mongo')
const backupPostgres = require('./SRC/commands/postgres')
    const answers = await inquirer.prompt([
      {
          type : 'list',
          name: 'dbtype',
          message: 'Select the database you want to back up:',
          choices: ['MongoDB','PostgreSQL']
      },
    ])  ;
    if(answers.dbtype === 'MongoDB'){
      const {dburi} = await inquirer.prompt([
          {
              type: 'input',
              name: 'dburi',
              message: 'Enter the MongoDB connection URI:'
          }
      ]);
      backupMongo(dburi)
    }
    else if(answers.dbtype === 'PostgreSQL'){
     const {dbname, username,outputdirectory} = await inquirer.prompt([
        {
           type: 'input',
           name: 'dbname',
           message: 'Enter the name of the database you want to backup'
        },{
          type: 'input',
          name: 'username',
          message :'Enter the name of the database user' 
        },{
          type:'input',
          name:'outputdirectory',
          message: 'Please provide the path of the output directory for saving the backup'
        }
      ]);
      backupPostgres(dbname,username,outputdirectory)
    }
  }

  module.exports = main;
  