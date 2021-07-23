// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3'

let db = new sqlite3.Database('./db.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

  export default db;