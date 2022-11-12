import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'

const defaults = {
  title: `> query.wtf`,
  description: `query ethereum from the url bar`,
  url: `https://query.wtf`
}

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>{pageProps.title || defaults.title}</title>
      <meta name="description" content={pageProps.description || defaults.description} />

      {/*<!-- Google / Search Engine Tags -->*/}
      <meta itemProp="name" content={pageProps.title || defaults.title} />
      <meta itemProp="description" content={pageProps.description || defaults.description} />

      {/*<!-- Facebook Meta Tags -->*/}
      <meta property="og:title" content={pageProps.title || defaults.title} />
      <meta property="og:description" content={pageProps.description || defaults.description} />
      <meta property="og:url" content={pageProps.title || defaults.title} />
      <meta property="og:type" content="website" />

      {/*<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:title" content={pageProps.title || defaults.title} />
      <meta name="twitter:description" content={pageProps.description || defaults.description} />
      <meta name="twitter:card" content="summary_large_image" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
    <footer className='h-[150px] block text-slate-700 text-xs text-center pt-8 mt-8 mb-8'>
      <div className="mx-auto text-center">
        <div><a href="https://twitter.com/jtgi" target={"_blank"} rel="noreferrer"><Image width={40} height={40} className="inline mx-auto animate-bounce rounded-full border border-gray-100 shadow-sm shadow-md" src="/jtgi.jpeg" alt={''} /></a></div>
        <a className="uppercase text-[10px]" href='https://twitter.com/jtgi' target={"_blank"} rel="noreferrer"> made by jtgi</a>
      </div>
    </footer>
  </>
}
