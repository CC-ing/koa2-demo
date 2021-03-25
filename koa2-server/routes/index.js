const router = require('koa-router')()
const usersControllers = require('../controllers/users')
const multiparty = require('koa2-multiparty');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', multiparty(), usersControllers.login)
router.post('/upload', usersControllers.upload)

router.get('/validToken', usersControllers.validToken)

module.exports = router
