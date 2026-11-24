
import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  path = ''
}) {
  const siteName = 'Naeem Arshad'
  const url = `https://naeemarshad.com${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
    </Helmet>
  )
}
