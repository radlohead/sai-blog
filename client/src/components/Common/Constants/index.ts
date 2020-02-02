const EBS_URL =
    'http://nodeblog-env.ccc35uvu2d.ap-northeast-2.elasticbeanstalk.com'
const LOCAL_SERVER_URL = 'http://localhost:4000'
export const BASE_URL =
    process.env.NODE_ENV === 'production' ? EBS_URL : LOCAL_SERVER_URL
