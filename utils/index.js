const bcrypt = require('bcryptjs')

// 密码加密
function hashPwd(password = 'abc123cd') {
    const salt = bcrypt.genSaltSync(generateFactor())
    return bcrypt.hashSync(password, salt)

    // return new Promise((resolve, reject) => {
    //     bcrypt.genSalt(generateFactor(), (e, salt) => {
    //         if (e) return reject(e)
    //         bcrypt.hash(password, salt, (e, pwd) => {
    //             if (e) return reject(e)
    //             resolve(pwd)
    //         })
    //     })
    // })
}

function generateFactor() {
    const BCRYPT_WORK_FACTOR_BASE = 12
        , BCRYPT_DATE_BASE = 1483228800000
        , BCRYPT_WORK_INCREASE_INTERVAL = 47300000000
        , BCRYPT_CURRENT_DATE = new Date().getTime()
        , UPPER = Math.floor((BCRYPT_CURRENT_DATE - BCRYPT_DATE_BASE) / BCRYPT_WORK_INCREASE_INTERVAL)
        , BCRYPT_WORK_INCREASE = Math.max(0, UPPER)
    return Math.min(19, BCRYPT_WORK_FACTOR_BASE + BCRYPT_WORK_INCREASE)
}

// 密码对比
function compare(dataPwd, pwd) {
    return bcrypt.compareSync(dataPwd, pwd)
}


module.exports = {
    hashPwd,
    compare
}