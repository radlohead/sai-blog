const fs = require('fs')
const AWS = require('aws-sdk')
const appRoot = require('app-root-path')
const awsInfo = require('./awsInfo')

const S3 = new AWS.S3({
    accessKeyId: awsInfo.accessKeyId,
    secretAccessKey: awsInfo.secretAccessKey,
    region: awsInfo.region
})

module.exports = async (file, success, fail) => {
    const today = new Date()
    const todayValue = `${today.getFullYear()}/${today.getMonth() +
        1}/${today.getDate()}`
    const filepath = appRoot + '/' + file.path
    const params = {
        Key: `${todayValue}/${file.filename}`, // S3에 저장될 위치(디렉토리/파일명), 존재하지 않으면 자동 생성
        Bucket: 'sai-blog', // 위에서 생성한 AWS S3 Bucket 이름
        Body: fs.createReadStream(filepath), // 저장되는 데이터
        contentType: file.mimetype // MIME 타입
    }

    S3.upload(params, (err, data) => {
        if (err) fail(err)
        else success(data)
    })
}
