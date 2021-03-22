const userModel = require('../models/users')

const signIn = async (userInfo) => {
    const result = await userModel.insertUser(userInfo)
    return result
}

const getUserExist = async (name) => {
    const result = await userModel.getUser(name)
    console.log('------', result);
    return result
}

const validUser = async (userInfo) => {
    
}

module.exports = {
    signIn,
    getUserExist,
    validUser
}