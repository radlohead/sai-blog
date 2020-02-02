const S3_URL = 'http://sai-blog.s3-website.ap-northeast-2.amazonaws.com/'
const LOCAL_SERVER_URL = 'http://localhost:4000'
export const BASE_URL =
    window.location.href === S3_URL ? S3_URL : LOCAL_SERVER_URL
