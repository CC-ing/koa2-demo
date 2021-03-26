const router = require('koa-router')()
const usersControllers = require('../controllers/users')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', usersControllers.login)

router.get('/validToken', usersControllers.validToken)

module.exports = router
