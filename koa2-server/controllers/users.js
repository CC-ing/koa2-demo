const userServices = require('../services/users')
const jwt = require('jsonwebtoken');
const secret = 'jwt demo'

const login = async (ctx, next) => {
    const userInfo = ctx.request.body;
    // 检查数据库中是否有用户
    const users = await userServices.getUserExist(userInfo.name);
    let response = {}
    console.log('user', users);
    if (users && users[0]) {
        // 有则返回
        if (users[0].password === userInfo.password) {
            const user = {
                name: users[0].name,
                id: users[0].id
            }
            const token = jwt.sign(user, secret, { expiresIn: '1h' })
            response = {
                code: 200,
                user,
                token
            }
        } else {
            response = {
                code: 500,
                msg: '密码不正确'
            }
            // 向客户端主动抛错，但是客户端收不到body
            // ctx.response.status = 500;
            // ctx.response.body = {
            //     msg: '密码错误'
            // }
            // return
        }

    } else {
        // 没有则进行创建并登录
        const res = await userServices.signIn(userInfo)
        console.log('res', res);
        const user = {
            name: userInfo.name,
            id: res.insertId
        }
        if (res.insertId >= 0) {
            const token = jwt.sign(user, secret, { expiresIn: '1h' })
            response = {
                code: 200,
                user: {
                    name: userInfo.name,
                    id: res.insertId
                },
                token
            }
        }
    }

    ctx.body = response
}

const validToken = async (ctx, next) => {
    ctx.body = {
        code: 200
    }
}


module.exports = {
    login,
    validToken
}