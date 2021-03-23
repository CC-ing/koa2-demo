const { query } = require('../util/db-util')

const addPost = async (post) => {
    const sql = 'insert into posts set ?'
    const result = await query(sql, post)
    return result
}

const getPostList = async () => {
    const sql = `SELECT * FROM posts`
    return await query(sql)
}

const getPost = async (postId) => {
    const sql = `SELECT posts.id, posts.title, posts.content, posts.ctime, name FROM user, posts
    WHERE user.id=posts.uid AND posts.id=${postId}`
    return await query(sql)
}

module.exports = {
    addPost,
    getPostList,
    getPost
}