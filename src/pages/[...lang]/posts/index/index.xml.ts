import rss, { pagesGlobToRssItems } from '@astrojs/rss'
import { Language, translate } from '@utils/i18n'
import type { APIContext } from 'astro'

export function getStaticPaths() {
  return [
    // Using a filename like src/pages/[lang]/index.xml does not work -- the
    // endpoint would be available in en.xml and pt.xml. This is some hacky way
    // to build the XML in /{en,pt}/index.ml
    { params: { lang: undefined }, props: { language: 'en' } },
    { params: { lang: 'pt' }, props: { language: 'pt' } },
  ]
}

export const get = async ({ props }: APIContext<{ language: Language }>) => {
  const t = translate(props.language)

  return rss({
    title: t('SiteTitle'),
    description: t('SiteDescription'),
    site: import.meta.env.SITE,
    items: await pagesGlobToRssItems(import.meta.glob('./posts/*.mdx')),
    customData: `<language>${
      props.language === 'en' ? 'en-us' : 'pt-br'
    }</language>`,
  })
}
