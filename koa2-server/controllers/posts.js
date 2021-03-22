const postsServer = require('../services/posts')

const addPost = async (ctx, next) => {
    const post = ctx.request.body;
    const result = await postsServer.addPost(post)
    ctx.body = result
}

module.exports = {
    addPost
}