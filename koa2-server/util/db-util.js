const mysql = require('mysql');
const sqlConfig = require('../config/mysql');

const pool = mysql.createPool(sqlConfig);

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(sql, values, (error, results, fields) => {
                connection.release();
                if (error) reject(error)
                resolve(results)
            });
        });
    })
}

const findData = (columns, table) => {
    console.log('columns, table', columns, table);
    const sql = 'SELECT ?? FROM ??';
    return query(sql, [columns, table])
}

const insertData = (values) => {
    const sql = 'INSERT INTO ?? set ?';
    return query(sql, values)
}

const deleteTable = (table) => {
    const sql = 'DELETE FROM ?'
    return query(sql, [table])
}

module.exports = { query, insertData, deleteTable, findData }
