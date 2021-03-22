const router = require('koa-router')()
const postsControllers = require('../controllers/posts')

router.prefix('/posts')

router.post('/addPost', postsControllers.addPost)

module.exports = router