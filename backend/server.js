import chalk from 'chalk'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes.js'
import cors from 'cors'

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.on('connected',()=> console.log(chalk.cyanBright('Conected with the API sucessfully!')))

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const corsOptions = {
   optionsSuccessStatus: 200,
   // origin: 'https://vrplanner.vercel.app'
   origin: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use('/api', router)

app.listen(PORT, console.log(chalk.magentaBright(`API listening the port: ${PORT}`)))