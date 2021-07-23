const Router = require("express");

let db = new sqlite3.Database('./db.db');

const router = new Router()


// GET ALL
router.get('/', function (req, res) {

    console.log('barev aper')
    
    let sql = `SELECT  p.product_id, name, mnn_id, mnn_name, mnn_code
    FROM products p
    LEFT JOIN mnn m
    ON p.product_id = m.product_id`;

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
    console.log(tempArr)
    res.send(tempArr);
    // res.render('index.ejs');
});

/*
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
*/

module.exports = router;