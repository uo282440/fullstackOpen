const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en puerto ${config.PORT}`)
})
