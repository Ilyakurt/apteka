// import ShopBody from './ShopBody';

const Router = require("express");

// const sqlite3 = require('sqlite3').verbose();

// const getObjectFromDB = () => {
//     let db = new sqlite3.Database('./db.db');
//     let sql = `SELECT product_id, name FROM products`;

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }
//         rows.forEach((row) => {
//             // console.log(row.name);
//             insertOrUpdateItem(
//                 {
//                     id: row.product_id,
//                     title: row.name, 
//                     description: "descr", 
//                     url: "url", 
//                     date: Date.now()
//                 }
//             );
//         });
//     });

//     db.close();
// };

const router = new Router()


// GET ALL
router.get('/get', function (req, res) {
    let db = new sqlite3.Database('./db.db');
    let sql = `SELECT product_id, name FROM products`;

    var tempArr = []

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            tempArr.push(
                {
                    id: row.product_id,
                    title: row.name, 
                    description: "descr", 
                    url: "url", 
                    date: Date.now()
                }
            );
        });
    });

    db.close();
    res.send(tempArr);
});

// DELETE ONE
router.get('/', function (req, res) {
    let db = new sqlite3.Database('./db.db');

    // TODO: Check
    let sql = `DELETE FROM products WHERE product_id = ?`;
    db.run(sql, [req.body.product_id], function(err) {
        if (err) { return console.log(err.message); }
      });

    db.close();

    // send answer 
    res.send("Done");
});

// update one
router.get('/a', function (req, res) {
    let db = new sqlite3.Database('./db.db');

    // TODO: Check
    let sql = `UPDATE products SET name = ? WHERE name = ?`;

    db.run(sql, [req.body.new_name, req.body.name], function(err) {
        if (err) { return console.log(err.message); }
      });

    db.close();

    // send answer 
    res.send("Done");
});

// Insert one
router.get('/b', function (req, res) {
    let db = new sqlite3.Database('./db.db');

    // TODO: Check
    let sql = `INSERT INTO products VALUES(?, ?)`

    // inserst element from db
    db.run(sql, [req.body.product_id, req.body.name], function(err) {
        if (err) { return console.log(err.message); }
      });

    db.close();

    // send answer 
    res.send("Done");
});

module.exports = router;