const { insertData, findData, query } = require('../util/db-util')

const insertUser = async (userInfo) => {
    const result = insertData(['user', userInfo])
    return result
}

const getUser = async (name) => {
    const sql = `SELECT * FROM user WHERE name = '${name}'`
    const result = query(sql);
    return result
}

module.exports = { insertUser, getUser }