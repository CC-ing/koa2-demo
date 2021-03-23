const router = require('koa-router')()
const postsControllers = require('../controllers/posts')

router.prefix('/posts')

router.post('/addPost', postsControllers.addPost)
router.get('/list', postsControllers.getPostList)
router.get('/:id', postsControllers.getPost)

module.exports = router