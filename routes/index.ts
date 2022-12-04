import express from 'express'

import diariesRouter from './diares.router'

export default function routerApi (app: express.Application): void {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/diaries', diariesRouter)
}
