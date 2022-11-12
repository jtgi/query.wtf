import { LinkIcon } from '@heroicons/react/20/solid'

const samples = [
  {
    title: 'Get token uri for Cryptoadz token 1',
    href: 'https://query.wtf/0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6/tokenURI/1'
  },
  {
    title: 'Get svg for Terraform token',
    href: 'https://query.wtf/0x4e1f41613c9084fdb9e34e11fae9412427480e56/tokenSVG/1'
  },
  {
    title: 'Get total UNI supply',
    href: 'https://query.wtf/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/totalSupply'
  }
]

export default function Home() {
  return (
    <div>
      <div className="bg-gray-800 break-words text-slate-200 m-5 md:mx-auto sm:m-5 md:w-3/5 md:max-w-[800px] rounded-md p-6 drop-shadow-lg border border-gray-800">
        <h1 className="font-semibold font-mono text-orange-400">&gt; query.wtf</h1>
        <h2 className="font-semibold font-mono">query ethereum from the url bar</h2>
        <p className="opacity-50">browser – {`query.wtf/:contract/:function/:arg1/:arg2/...`}</p>
        <p className="opacity-50">api – {`query.wtf/api/:contract/:function/:arg1/:arg2/...`}</p>

      </div>

      <div className='text-slate-800 m-5 md:mx-auto sm:m-5 md:w-3/5 md:max-w-[800px] space-y-4'>
        {samples.map(sample => (
          <a key={sample.href} target="_blank" href={sample.href} className="bg-gray-200 rounded-md p-6 drop-shadow-md border border-gray-400 hover:border-gray-600 hover:cursor-pointer block break-words transition-all hover:scale-102" rel="noreferrer">
            <p className="font-semibold font-mono">{sample.title}</p>
            <p className="italic opacity-70 break-words">{sample.href.replace("https://", "")}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
