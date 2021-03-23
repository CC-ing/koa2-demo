const postsModel = require('../models/posts')

const addPost = async (post) => {
    const result = await postsModel.addPost(post)
    return result
}

const getPostList = async () => {
    return await postsModel.getPostList()
}
const getPost = async (postId) => {
    return await postsModel.getPost(postId)
}
module.exports = {
    addPost,
    getPostList,
    getPost
}