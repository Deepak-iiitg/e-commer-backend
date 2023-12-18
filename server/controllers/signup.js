const db = require('../models/database').conn;
const bcrypt = require('bcrypt');
function isExist(req, res, next) {
    try {
        let email = req.body.email;
        const sql = 'select * from users where email=?';
        db.connect((err) => {
            console.log('connected');
            if (err) {
                return res.status(500).json({
                    message: 'internal server error'
                });
            }
            db.query(sql, [[email]], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: 'internal server error'
                    });
                }
                if (result.length > 0) {
                    return res.status(201).json({
                        message: 'user already regitered,please login'
                    });
                } else {
                    next();
                }
            })
        })
    } catch (e) {
        return res.status(500).json({
            message: 'internal server error'
        })
    }

}
async function signup(req, res) {
    try {
        const data = req.body;
        const password = await bcrypt.hash(data.password, 10);
        const sql = 'insert into users(name,email,password) values ?';
        db.connect((err) => {
            if (err) {

                return res.status(500).json({
                    message: 'internal server error'
                })
            }
            db.query(sql, [[[data.name, data.email, password]]], (err, result) => {
                if (err) {
                    console.log('first error');
                    return res.status(500).json({
                        message: 'internal server error'
                    })
                }
                return res.status(201).json({
                    message: 'user regietsred successfully'
                })
            }
            )
        })
    }
    catch (e) {
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}
module.exports = { signup, isExist };