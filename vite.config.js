import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

const pages = {
  '/': {
    title: 'Ulaş Gökçe',
    description: 'Ulaş Gökçe is a senior full-stack developer in İzmir, building Vue and Laravel products for teams in Munich.',
  },
  '/about': {
    title: 'About — Ulaş Gökçe',
    description: 'Fast, but never sloppy. Ulaş Gökçe works remotely from İzmir for companies in Munich.',
  },
  '/work': {
    title: 'Work — Ulaş Gökçe',
    description: 'What Ulaş Gökçe has built at Tendex and Sales Automation, plus Chrome extensions, Vela, and a studio website.',
  },
  '/growth': {
    title: 'Growth — Ulaş Gökçe',
    description: 'Get found on Google and in AI answers. Websites, technical SEO, and AI visibility for companies.',
  },
  '/work/sales-automation': {
    title: 'Sales Automation — Ulaş Gökçe',
    description: 'Software that lets sales teams run email, LinkedIn, and meetings from one place.',
  },
  '/work/tendex': {
    title: 'Tendex — Ulaş Gökçe',
    description: 'Three years at Tendex: the payments and subscriptions system, and the pipeline that got lead data ready for campaigns.',
  },
  '/work/epsilos': {
    title: 'Epsilos — Ulaş Gökçe',
    description: 'Epsilos is a web and e-commerce platform founded by Ulaş Gökçe’s brother.',
  },
  '/work/izzi': {
    title: 'Stüdyo İzzi — Ulaş Gökçe',
    description: 'The live website for Stüdyo İzzi, a recording and mixing studio in Karşıyaka, İzmir.',
  },
  '/work/vela': {
    title: 'Vela — Ulaş Gökçe',
    description: 'Vela cuts down the repetitive clicking insurance agencies do when preparing quotes.',
  },
  // Uncomment when the Laz dictionary is published.
  // '/work/sozluk': {
  //   title: 'Laz dictionary — Ulaş Gökçe',
  //   description: 'A Laz–Turkish dictionary with words, example sentences, and pronunciations. Not live yet.',
  // },
  '/work/eklentiler': {
    title: 'Chrome extensions — Ulaş Gökçe',
    description: 'Chrome extensions by Ulaş Gökçe for Sales Automation and Vela, plus his own action recorder.',
  },
}

function originFrom(req) {
  const forwarded = req.headers['x-forwarded-proto']
  const proto = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || 'http')
    .split(',')[0]
    .trim()
  const hostHeader = req.headers['x-forwarded-host'] || req.headers.host || 'localhost'
  const host = String(Array.isArray(hostHeader) ? hostHeader[0] : hostHeader)
    .split(',')[0]
    .trim()
  return `${proto}://${host}`
}

function applyMeta(html, { origin, pathname }) {
  const path = pathname.split('?')[0].replace(/\/$/, '') || '/'
  const page = pages[path] || pages['/']
  const url = origin ? `${origin}${path === '/' ? '/' : path}` : path
  const image = origin ? `${origin}/images/og.jpg` : '/images/og.jpg'
  return html
    .replaceAll('__PAGE_TITLE__', page.title)
    .replaceAll('__PAGE_DESCRIPTION__', page.description)
    .replaceAll('/__PAGE_URL__', url)
    .replaceAll('__PAGE_URL__', url)
    .replaceAll('/__OG_IMAGE__', image)
    .replaceAll('__OG_IMAGE__', image)
}

function seoPlugin(siteUrl) {
  let request = { origin: siteUrl, pathname: '/' }

  function remember(req, res, next) {
    const pathname = String(req.originalUrl || req.url || '/').split('?')[0]
    if (/\.(?:webp|avif|jpe?g|png|svg|ico|woff2)$/i.test(pathname)) {
      const setHeader = res.setHeader.bind(res)
      res.setHeader = (name, value) => {
        if (String(name).toLowerCase() === 'cache-control') {
          return setHeader('Cache-Control', 'public, max-age=86400')
        }
        return setHeader(name, value)
      }
    }
    const origin = siteUrl || originFrom(req)
    let legacy = pathname === '/hakkinda'
      ? '/about'
      : pathname === '/is'
        ? '/work'
        : pathname.startsWith('/is/')
          ? `/work/${pathname.slice(4)}`
          : pathname
    legacy = legacy.replace(/\/sigorta$/, '/vela')
    if (legacy === pathname) legacy = ''
    if (legacy) {
      res.statusCode = 302
      res.setHeader('Location', legacy)
      res.end()
      return
    }
    if (pathname === '/sitemap.xml') {
      const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...Object.keys(pages).map(
          (path) => `  <url><loc>${origin}${path === '/' ? '/' : path}</loc></url>`,
        ),
        '</urlset>',
      ].join('\n')
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.end(body)
      return
    }
    if (pathname === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
      return
    }
    request = {
      origin,
      pathname: pathname === '/index.html' ? '/' : pathname,
    }
    next()
  }

  return {
    name: 'seo-meta',
    configureServer(server) {
      server.middlewares.use(remember)
    },
    configurePreviewServer(server) {
      server.middlewares.use(remember)
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return applyMeta(html, request)
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.SITE_URL || env.VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [vue(), tailwindcss(), seoPlugin(siteUrl)],
    server: {
      allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
    },
  }
})
