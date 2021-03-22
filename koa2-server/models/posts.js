const { query } = require('../util/db-util')

const addPost = async (post) => {
    const sql = 'insert into posts set ?'
    const result = await query(sql, post)
    return result
}

module.exports = {
    addPost
}