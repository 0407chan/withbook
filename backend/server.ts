import appRootPath from 'app-root-path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { format } from 'date-fns'
import express from 'express'
import morgan from 'morgan'
import router from './routes'
import cors from 'cors'
const app = express()
const port = 3010

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(
  bodyParser.json({
    limit: '50mb'
  })
)

app.use(express.static(appRootPath.resolve('/public')))
app.use(router)

app.listen(port, () => {
  console.log(format(new Date(), 'yyyy-MM-dd HH:mm'))
  console.log('서버열렸땅', port)
})
