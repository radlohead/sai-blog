const cors = require('cors')
const express = require('express')
const mysql = require('mysql2')
const app = express()
const userInfo = require('./userInfo')
const connection = mysql.createConnection(userInfo)
app.set('port', process.env.PORT || 4000)

app.get('/productTab', cors(), (req, res, next) => {
    connection.query('select * from board', (err, rows) => {
        if (err) console.log('Error', err)
        res.set('Content-Type', 'application/json')
        res.send(rows)
    })
})

app.listen(app.get('port'), () => {
    console.log('server connect')
})
