import { Router } from 'express'
import { upload } from './middlewares'
import fs from 'fs'
import { processSvg } from './utils/processSvg'

const DEFAULT_OPTIONS = {
  title: 'Kontentino Svg Optimizer',
}

const baseRouter = Router()

baseRouter.get('/', function (req, res, next) {
  res.render('index', { ...DEFAULT_OPTIONS })
})

baseRouter.post(
  '/optimize',
  upload.single('icon'),
  async function (req, res, next) {
    try {
      if (!!req.file) {
        const svgString = fs.readFileSync(req.file.path).toString()
        const optimizedSvgString = await processSvg(svgString)

        const newFileName = req.file.path.replace('.svg', '-optimized.svg')

        fs.writeFileSync(newFileName, optimizedSvgString)

        return res.download(newFileName, newFileName)
      }

      return res.render('index', {
        ...DEFAULT_OPTIONS,
        error: new Error('Wrong File Selected'),
      })
    } catch (e) {
      return res.render('index', {
        ...DEFAULT_OPTIONS,
        error: new Error('Unknown Error'),
      })
    }
  }
)

export default baseRouter
