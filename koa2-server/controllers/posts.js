const postsServer = require('../services/posts')

const addPost = async (ctx, next) => {
    const post = ctx.request.body;
    const result = await postsServer.addPost(post)
    ctx.body = result
}

const getPostList = async (ctx, next) => {
    const result = await postsServer.getPostList()
    ctx.body = result
}

const getPost = async (ctx, next) => {
    const postId = ctx.params.id
    const result = await postsServer.getPost(postId)
    ctx.body = {
        code: 200,
        data: {
            ...result[0],
            username: result[0].name
        }
    }
}

module.exports = {
    addPost,
    getPostList,
    getPost
}