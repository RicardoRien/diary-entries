import express from 'express'
import routerApi from '../routes/index'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('=== Ping! ===')
  res.send('Paskong!')
})

routerApi(app)

app.listen(PORT, () => {
  console.log(`~ ~ ~ ~ Server running on port: ${PORT} ~ ~ ~ ~`)
})
