import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { dbConnect } from './src/configs/dbConnect.mjs'
                       
import routes from './src/routes.mjs'

dbConnect()

const app = express()

const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:5173'
                
app.use(cors({
  origin: [FRONTEND_URL],
}))

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', routes)

export default app

