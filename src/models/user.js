const connection = require('../configs/mysql')

module.exports = {
    getUser: (limit, activePage, searchName, sortBy, orderBy) => {
        return new Promise((resolve, reject) => {
            const totalData = connection.query('SELECT count (*) FROM products')
            const totalPages = Math.ceil(totalData / limit)
            const firstData = ((limit * activePage) - limit)
            connection.query(`SELECT user.*, user_level.name_level FROM user LEFT JOIN user_level ON user.Status = user_level.id WHERE name LIKE '%${searchName}%'
      ORDER BY ${sortBy} ${orderBy}
      LIMIT ${firstData},${limit}`,
                (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
        })
    },
    DeleteUser: (posId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM user WHERE id = ?', posId)
            connection.query('SELECT user.*, user_level.name_level FROM user LEFT JOIN user_level ON user.Status = user_level.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    UpdateUser: (data, posId) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET ? WHERE id = ?', [data, posId])
            connection.query('SELECT user.*, user_level.name_level FROM user LEFT JOIN user_level ON user.Status = user_level.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data)
            connection.query('SELECT user.*, user_level.name_level FROM user LEFT JOIN user_level ON user.Status = user_level.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE email = ?', email, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}