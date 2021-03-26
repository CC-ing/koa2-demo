const userServices = require('../services/users')
const inspect = require('util').inspect
const jwt = require('jsonwebtoken');
const fs = require('fs-extra')
const path = require('path')
const Busboy = require('busboy')
const multiparty = require('multiparty');

const secret = 'jwt demo'


const login = async (ctx, next) => {
    const userInfo = ctx.request.body;
    // 检查数据库中是否有用户
    const users = await userServices.getUserExist(userInfo.name);
    let response = {}
    if (users && users[0]) {
        // 有则返回
        if (users[0].password === userInfo.password) {
            const user = {
                name: users[0].name,
                id: users[0].id,
                avatar: `images/${users[0].avatar}`
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
        // 处理头像
        const base64Data = userInfo.avatar.imageUrl.replace(/^data:image\/\w+;base64,/, "")
        const buffer = Buffer.from(base64Data, 'base64')
        const targetDir = path.resolve(__dirname, `../public/images`)
        if (fs.existsSync(targetDir)) {
            fs.writeFile(`${targetDir}/${userInfo.avatar.imageName}`, buffer, err => {
                console.log(err);
            })
        } else {
            fs.mkdirSync(targetDir);
            fs.writeFile(`${targetDir}/${userInfo.avatar.imageName}`, buffer, err => {
                console.log(err);
            })
        }

        const signInData = {
            ...userInfo,
            avatar: userInfo.avatar.imageName
        }
        const res = await userServices.signIn(signInData)
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
                    id: res.insertId,
                    avatar: `images/${userInfo.avatar.imageName}`
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
    validToken,
}