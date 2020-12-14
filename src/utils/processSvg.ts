import Svgo from 'svgo'
import cheerio from 'cheerio'
import { format } from 'prettier'

const DEFAULT_ATTRS = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

export function processSvg(svg: string) {
  return (
    optimize(svg)
      .then(setAttrs)
      .then(format)
      // remove semicolon inserted by prettier
      // because prettier thinks it's formatting JSX not HTML
      .then((svg) => svg.replace(/;/g, ''))
  )
}

function optimize(svg: string) {
  const plugins = [
    { convertShapeToPath: false },
    { mergePaths: false },
    { removeTitle: true },
    { removeAttrs: { attrs: '(fill|stroke.*)' } },
  ]

  const svgo = new Svgo({
    plugins,
  })

  return new Promise((resolve) => {
    svgo.optimize(svg).then((res) => {
      console.log(res)
      resolve(res.data)
    })
  })
}

function setAttrs(svg: string): string {
  const $ = cheerio.load(svg)

  Object.keys(DEFAULT_ATTRS).forEach((key) =>
    $('svg').attr(key, DEFAULT_ATTRS[key])
  )

  return $('body').html()
}

export default processSvg
