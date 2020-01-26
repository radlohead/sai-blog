const express = require('express')
const mysql = require('mysql2')
const app = express()
const bodyParser = require('body-parser')
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

app.get('/join', (req, res, next) => {
    connection.query('SELECT * FROM user', (err, rows) => {
        if (err) console.error(err)
        res.set('Content-Type', 'application/json')
        res.send(rows)
    })
})
app.post('/join', (req, res, next) => {
    const sql =
        'INSERT INTO user(id, password, createdAt, updatedAt) VALUES(?, ?, ?, ?)'
    connection.query(
        sql,
        [
            req.body.id,
            req.body.password,
            req.body.createdAt,
            req.body.updatedAt
        ],
        (err, rows) => {
            if (err) console.error(err)
            res.set('Content-Type', 'application/json')
            res.send({ status: 'SUCCESS' })
        }
    )
})

app.listen(app.get('port'), () => {
    console.log('server connect')
})
