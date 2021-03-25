const userServices = require('../services/users')
const inspect = require('util').inspect
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')
const multiparty = require('multiparty');

const secret = 'jwt demo'



const login = async (ctx, next) => {
    const userInfo = ctx.request.body;
    const req = ctx.req
    // 检查数据库中是否有用户
    const users = await userServices.getUserExist(userInfo.name);
    var base64Data = userInfo.avatar.fileList[0].thumbUrl.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(`./${userInfo.avatar.file.name}`, dataBuffer, err => {
        if (err) {
            throw err;
            // reject(false)
        };
        // reslove(true)
        console.log('头像上传成功')
    })
    
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


// function uploadFile(ctx, options) {
//     let req = ctx.req
//     let res = ctx.res
//     let busboy = new Busboy({ headers: req.headers })

//     // 获取类型
//     let fileType = options.fileType || 'common'

//     return new Promise((resolve, reject) => {
//         console.log('文件上传中...')
//         let result = {
//             success: false,
//             formData: {},
//         }

//         // 解析请求文件事件
//         busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

//             let saveTo = path.join(__dirname, filename)

//             // 文件保存到制定路径
//             file.pipe(fs.createWriteStream(saveTo))

//             // 文件写入事件结束
//             file.on('end', function () {
//                 result.success = true
//                 result.message = '文件上传成功'
//                 console.log('文件上传成功！')
//             })
//         })


//         req.pipe(busboy)
//     })

// }
const upload = async (ctx, next) => {
    let result = { success: false }
    let serverFilePath = path.join(__dirname, 'upload-files')
    result = await uploadFile(ctx, {
        fileType: 'album',
        path: serverFilePath
    })

    ctx.body = {
        code: 200,
        success: true
    }
}


module.exports = {
    login,
    validToken,
    upload
}