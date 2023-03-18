import Config from './Config'

process.stdout.write(`Starting ${Config.ServiceName}...`)

setTimeout(() => {
  process.stdout.write('Bye!')
}, 5 * 60 * 1000)
