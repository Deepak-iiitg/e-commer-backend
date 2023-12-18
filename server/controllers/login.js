const db = require('../models/database').conn;
const bcrypt = require('bcrypt'); // bcrypt is used to password encryption,which any one cant hack password
const { setToken } = require('../services/user');
const { v4: uuidv4 } = require('uuid');
//uuid is used to generate unique password
async function login(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    try {
        db.connect((err) => {
            if (err) {
                return res.status(500).json({
                    message:'internal server error'
                });
            }
            const sql = 'select * from users where email=?';
            db.query(sql, [[email]], async (err, result) => {
                if (err) {
                    return res.status(500).json('internal server error');
                }
                if (result.length > 0) {

                    const isExist = await bcrypt.compare(password, result[0]["password"]);
                    if (isExist) {
                        const token = setToken({ email: req.body.email });
                        return res.status(201).json({
                            message: true,
                            token: token
                        })
                    } else {
                        return res.status(404).json({
                            message: 'wrong user or password'
                        })
                    }
                } else {
                    return res.status(404).json({
                        message: 'wrong user or password'
                    })
                }
            })
        })
    }
    catch (e) {
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}
module.exports = { login };