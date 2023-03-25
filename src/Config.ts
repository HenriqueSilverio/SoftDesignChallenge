import env from 'require-env'

const Config = {
  JWTScret: env.require('JWT_SECRET'),
  WebServerPort: Number(env.require('WEBSERVER_PORT')),
}

export default Config
