import { Router } from 'express'
import { upload } from './middlewares'
import fs from 'fs'
import { processSvg } from './utils/processSvg'

const baseRouter = Router()

baseRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Kontentino Svg Optimizer' })
})

baseRouter.post(
  '/optimize',
  upload.single('icon'),
  async function (req, res, next) {
    const svgString = fs.readFileSync(req.file.path).toString()
    const optimizedSvgString = await processSvg(svgString)

    const newFileName = req.file.path.replace('.svg', 'optimized.svg')

    fs.writeFileSync(newFileName, optimizedSvgString)

    return res.download(newFileName, newFileName)
  }
)

export default baseRouter
