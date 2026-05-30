import express from 'express'
import dotenv from 'dotenv'
import db from './config/db.js'
import appRoutes from './routes/app.routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config();

const PORT = 3000 || process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
db();

app.use('/api',appRoutes);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})