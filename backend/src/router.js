import Router from 'express'
const router = new Router()
import db from '../db/index.js'

router.get('/get', (req, res) => {
    let sql = `SELECT  p.product_id, name, mnn_id, mnn_name, mnn_code
    FROM products p
    LEFT JOIN mnn m
    ON p.product_id = m.product_id`

    var tempArr = []

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            tempArr.push({
                id: row.product_id,
                name: row.name, 
                mnn_id: row.mnn_id, 
                mnn_name: row.mnn_name,
                mnn_code: row.mnn_code
            })
        });
        res.send(tempArr)
    });
    // console.log(tempArr)
});

router.post('/insert', (req, res) => {
    let sql = `INSERT INTO products VALUES(?, ?)`
    let sql2 = `INSERT INTO mnn VALUES(?, ?, ?, ?)`

    // POST with 'product_id' and 'name'
    db.run(sql, [req.query.product_id, req.query.name], function(err) {
        if (err) { return console.log(err.message); }
    });

    db.run(sql2, [req.query.product_id, req.query.mnn_id, req.query.mnn_name, req.query.mnn_code], function(err) {
        if (err) { return console.log(err.message); }
    });
});


router.post('/delete', (req, res) => {
    let sql = `DELETE FROM products WHERE product_id = ?`;
    let sql2 = `DELETE FROM mnn WHERE product_id = ?`;

    // POST with 'product_id'
    db.run(sql, [req.query.product_id], function(err) {
        if (err) { return console.log(err.message); }
    });

    db.run(sql2, [req.query.product_id], function(err) {
        if (err) { return console.log(err.message); }
    });
});

router.post('/update', (req, res) => {
    let sql = `UPDATE products SET product_id = ?, name = ? WHERE product_id = ?`;
    let sql2 = `UPDATE mnn SET product_id = ?, mnn_id = ?, mnn_name = ?, mnn_code = ? WHERE product_id = ?`;

    // POST with 'product_id', 'new_product_id', 'new_name', 'mnn_id', 'mnn_name', 'mnn_code'
    db.run(sql, [req.query.new_product_id, req.query.new_name, req.query.product_id], function(err) {
        if (err) { return console.log(err.message); }
    });
    db.run(sql2, [req.query.new_product_id, req.query.mnn_id, req.query.mnn_name, req.query.mnn_code], function(err) {
        if (err) { return console.log(err.message); }
    });
});

export default router;