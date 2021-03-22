const postsModel = require('../models/posts')

const addPost = async (post) => {
    const result = await postsModel.addPost(post)
    return result
}

module.exports = {
    addPost
}