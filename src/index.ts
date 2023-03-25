import Config from './Config'
import api from './WebServer/api'

api.listen(Config.WebServerPort, () => {
  console.log(`Web Server listening on http://localhost:${Config.WebServerPort}...`)
})
