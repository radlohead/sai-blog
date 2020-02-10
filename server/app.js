const express = require('express')
const mysql = require('mysql2')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const bcrypt = require('bcrypt')
const uploadToS3 = require('./upload-image')
const userInfo = require('./userInfo')
const connection = mysql.createConnection(userInfo)

app.set('port', process.env.PORT || 4000)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
    res.header('Access-Control-Request-Method', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Secrete_Token'
    )
    next()
})

const pwdEncryptF = (f, pwd) => {
    const saltFactor = 10
    bcrypt.genSalt(saltFactor, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(pwd, salt, (err, hash) => {
            if (err) return next(err)
            f(hash)
        })
    })
}

app.post(
    '/imageUpload',
    multer({ dest: 'temp/images/' }).any(),
    (req, res, next) => {
        uploadToS3(
            req.files[0],
            data => {
                res.json({
                    uploaded: true,
                    name: req.files[0].originalname,
                    url: data.Location,
                    error: null
                })
            },
            err => {
                res.json({ uploaded: false, url: null, error: err })
            }
        )
    }
)

app.post('/login', (req, res, next) => {
    const sql = 'SELECT * FROM user WHERE id=?'
    connection.query(sql, [req.body.id], (err, rows) => {
        if (err || !rows.length) {
            console.error('로그인이 실패했습니다.')
            next()
        } else {
            bcrypt.compare(
                req.body.password,
                rows[0].password,
                (err, result) => {
                    if (err) {
                        console.error('로그인이 실패했습니다.')
                    } else if (!result) {
                        console.error('비밀번호가 틀렸습니다.')
                    } else if (result) {
                        res.set('Content-Type', 'application/json')
                        res.send({ status: 'SUCCESS' })
                    }
                }
            )
        }
    })
})
app.get('/join', (req, res, next) => {
    connection.query('SELECT * FROM user', (err, rows) => {
        if (err) console.error(err)
        res.set('Content-Type', 'application/json')
        res.send(rows)
    })
})
app.post('/join', (req, res, next) => {
    const joinF = hash => {
        const sql =
            'INSERT INTO user(id, password, createdAt, updatedAt) VALUES(?, ?, ?, ?)'
        connection.query(
            sql,
            [req.body.id, hash, req.body.createdAt, req.body.updatedAt],
            (err, rows) => {
                if (err) console.error(err)
                res.set('Content-Type', 'application/json')
                res.send({ status: 'SUCCESS' })
            }
        )
    }
    pwdEncryptF(joinF, req.body.password)
})
app.get('/board/list', (req, res, next) => {
    if (req.query.id) {
        const sql = 'SELECT * FROM board WHERE id=?'
        connection.query(sql, [req.query.id], (err, rows) => {
            if (err) console.error(err)
            res.set('Content-Type', 'application/json')
            res.send(rows)
        })
    } else {
        connection.query('SELECT * FROM board', (err, rows) => {
            if (err) console.error(err)
            res.set('Content-Type', 'application/json')
            res.send(rows)
        })
    }
})
app.post('/board/write', (req, res, next) => {
    const sql =
        'INSERT INTO board(id, category, title, content, createdAt) VALUES(?, ?, ?, ?, ?)'
    connection.query(
        sql,
        [
            req.body.id,
            req.body.category,
            req.body.title,
            req.body.content,
            req.body.createdAt
        ],
        (err, rows) => {
            if (err) console.error(err)
            res.set('Content-type', 'application/json')
            res.send({ status: 'SUCCESS' })
        }
    )
})
app.get('/board/view/:rowId', (req, res, next) => {
    const sql = `SELECT * FROM board WHERE rowId=?`
    connection.query(sql, [req.params.rowId], (err, rows) => {
        if (err) console.error(err)
        res.set('Content-Type', 'application/json')
        res.send(rows)
    })
})

app.listen(app.get('port'), () => {
    console.log('server connect')
})
