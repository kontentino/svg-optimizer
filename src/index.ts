import express from 'express'
import path from 'path'
import env from './env'
import baseRouter from './router'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(baseRouter)

app.listen(env.port, () => {
  console.log(`server started at http://localhost:${env.port}`)
})
