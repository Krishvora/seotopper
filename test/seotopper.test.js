const test = require('ava')
const seotopper = require('../lib/seotopper')

test('main funcionality', t => {
  const actual = seotopper({
    title: 'Título da minha página',
    description: 'Descrição da minha página',
    author: 'Eu',
    base: 'https://sua-url.com.br',
    canonical: 'https://sua-url.com.br',
    sitemap: 'https://sua-url.com.br/sitemap.xml',
    robots: 'index/follow',
    themeColor: '#f00',
    image: 'https://sua-url.com.br/images/intro.jpg',
    facebook: {
      type: 'website',
      siteName: 'Exemplo',
      locale: 'pt_BR',
      id: '5349',
      admins: '123456789'
    },
    twitter: {
      card: 'summary'
    }
  })

  const expected = `<title>Título da minha página</title>
<meta name="description" content="Descrição da minha página"/>
<meta name="author" content="Eu"/>
<link rel="base" href="https://sua-url.com.br"
<link rel="canonical" href="https://sua-url.com.br"/>
<meta rel="sitemap" type="application/xml" content="https://sua-url.com.br/sitemap.xml"/>
<meta name="robots" content="index/follow"/>
<meta name="googlebot" content="index/follow"/>
<meta name="theme-color" content="#f00"/>
<meta name="msapplication-navbutton-color" content="#f00"/>
<meta name="apple-mobile-web-app-status-bar-style" content="#f00"/>
<!-- Schema.org markup for Google+ -->
<meta itemprop="name" content="Título da minha página"/>
<meta itemprop="description" content="Descrição da minha página"/>
<meta itemprop="image" content="https://sua-url.com.br/images/intro.jpg"/>
<!-- markup for facebook -->
<meta property="og:type" content="website"/>
<meta property="og:title" content="Título da minha página"/>
<meta property="og:url" content="http://meusite.com.br"/>
<meta property="og:site_name" content="Exemplo"/>
<meta property="og:image" content="https://sua-url.com.br/images/intro.jpg"/>
<meta property="og:description" content="Descrição da minha página"/>
<meta property="og:locale" content="pt_BR"/>
<meta property="fb:app_id" content="5349"/>
<meta property="fb:admins" content="123456789"/>
<!-- markup for twitter -->
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="Título da minha página"/>
<meta name="twitter:description" content="Descrição da minha página"/>
<meta name="twitter:creator" content="Eu"/>
<meta name="twitter:image" content="https://sua-url.com.br/images/intro.jpg"/>
<!-- JSON-LD - structured data markup Google Search -->
<script type="application/ld+json"/>
{
"@context": "http://schema.org",
"@type": "WebSite",
"name": "Título da minha página",
"alternateName": "Descrição da minha página",
"url": "https://sua-url.com.br"
}
</script/>`

  t.is(actual, expected, 'should return a valid html snippet')
})

test('base should be optional', t => {
  const actual = seotopper({
    title: 'Título da minha página',
    description: 'Descrição da minha página',
    author: 'Eu',
    canonical: 'https://sua-url.com.br',
    sitemap: 'https://sua-url.com.br/sitemap.xml',
    robots: 'index/follow',
    themeColor: '#f00',
    image: 'https://sua-url.com.br/images/intro.jpg',
    facebook: {
      type: 'website',
      siteName: 'Exemplo',
      locale: 'pt_BR',
      id: '5349',
      admins: '123456789'
    },
    twitter: {
      card: 'summary'
    }
  })

  t.notRegex(actual, /rel="base"/)
})

test('sitemap should be optional', t => {
  const actual = seotopper({
    title: 'Título da minha página',
    description: 'Descrição da minha página',
    author: 'Eu',
    canonical: 'https://sua-url.com.br',
    robots: 'index/follow',
    themeColor: '#f00',
    image: 'https://sua-url.com.br/images/intro.jpg',
    facebook: {
      type: 'website',
      siteName: 'Exemplo',
      locale: 'pt_BR',
      id: '5349',
      admins: '123456789'
    },
    twitter: {
      card: 'summary'
    }
  })

  t.notRegex(actual, /rel="sitemap"/)
})

test('themeColor should be optional', t => {
  const actual = seotopper({
    title: 'Título da minha página',
    description: 'Descrição da minha página',
    author: 'Eu',
    canonical: 'https://sua-url.com.br',
    robots: 'index/follow',
    image: 'https://sua-url.com.br/images/intro.jpg',
    facebook: {
      type: 'website',
      siteName: 'Exemplo',
      locale: 'pt_BR',
      id: '5349',
      admins: '123456789'
    },
    twitter: {
      card: 'summary'
    }
  })

  t.notRegex(actual, /name="theme-color"/)
  t.notRegex(actual, /name="msapplication-navbutton-color"/)
  t.notRegex(actual, /name="apple-mobile-web-app-status-bar-style"/)
})

test('facebook should be optional', t => {
  const actual = seotopper({
    title: 'Título da minha página',
    description: 'Descrição da minha página',
    author: 'Eu',
    canonical: 'https://sua-url.com.br',
    robots: 'index/follow',
    image: 'https://sua-url.com.br/images/intro.jpg',
    twitter: {
      card: 'summary'
    }
  })
  t.notRegex(actual, /property="og:type"/)
  t.notRegex(actual, /property="og:title"/)
  t.notRegex(actual, /property="og:url"/)
  t.notRegex(actual, /property="og:site_name"/)
  t.notRegex(actual, /property="og:image"/)
  t.notRegex(actual, /property="og:description"/)
  t.notRegex(actual, /property="og:locale"/)
  t.notRegex(actual, /property="fb:app_id"/)
  t.notRegex(actual, /property="fb:admins"/)
})

test('twitter should be optional', t => {
  const actual = seotopper({
    title: 'Título da minha página',
    description: 'Descrição da minha página',
    author: 'Eu',
    canonical: 'https://sua-url.com.br',
    robots: 'index/follow',
    image: 'https://sua-url.com.br/images/intro.jpg',
    facebook: {
      type: 'website',
      siteName: 'Exemplo',
      locale: 'pt_BR',
      id: '5349',
      admins: '123456789'
    }
  })
  t.notRegex(actual, /name="twitter:card"/)
  t.notRegex(actual, /name="twitter:title"/)
  t.notRegex(actual, /name="twitter:description"/)
  t.notRegex(actual, /name="twitter:creator"/)
  t.notRegex(actual, /name="twitter:image"/)
})
