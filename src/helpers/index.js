const crypto = require('crypto')

module.exports = {
    generateSalt: (length) => {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
    },

    setPassword: (password, salt) => {
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        const value = hash.digest('hex')
        return {
            salt: salt,
            passwordHash: value
        }
    }
}