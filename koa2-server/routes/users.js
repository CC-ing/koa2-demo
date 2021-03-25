const router = require('koa-router')()
const usersControllers = require('../controllers/users')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', usersControllers.login)
router.post('/upload', usersControllers.upload)

// router.post('/testify', function (ctx, next) {
//   console.log('ctx', ctx.request.body);
//   ctx.body = {
//     a: 1, b: 2
//   }
// })

module.exports = router
