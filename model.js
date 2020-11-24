/**
 * https://docs.microsoft.com/en-us/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver15
 * MIX ASSIST SERVER
 */

const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }
}

module.exports = AppDAO



