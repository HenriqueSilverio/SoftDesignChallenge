import env from 'require-env'

const Config = {
  ServiceName: env.require('SERVICE_NAME'),
}

export default Config
