import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useQuery } from '../hooks';
import { ClipboardIcon } from '@heroicons/react/20/solid'


export default function Query() {
  const { isLoading, error, data } = useQuery(async () => {
    const rsp = await fetch('/api' + window.location.pathname)
    const json = await rsp.json();

    if (!rsp.ok) {
      throw new Error(json.message);
    } else {
      return json.result;
    }
  })

  return (
    <div >
      <Head>
        <title>query.wtf</title>
      </Head>

      <div className="bg-gray-800 text-slate-200 m-5 md:mx-auto sm:m-5 md:w-3/5 md:max-w-[800px] rounded-md p-6 drop-shadow-lg min-h-[200px] border border-gray-800">
        <div className='flex justify-between mb-2'>
          {data && (<Copy text="Copy" />)}
        <h1 className="font-semibold font-mono text-orange-400">&gt; query.wtf</h1>
        </div>
        {isLoading && <div><Loader /></div>}
        {error && <div className='text-red-400 font-semibold'>{error.message}</div>}
        {data && <div className='break-words font-mono'>{renderData(data)}</div>}
      </div>
    </div>
  )
}

function renderData(data?: any): string {
  if (!data) {
    return " ";
  } else if (typeof data === 'string') {
    return data;
  } else if (Array.isArray(data) && data.length === 0) {
    return '[]';
  } else {
    return JSON.stringify(data, null, 2);
  }
}

function Loader({ text = "_" }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const ref = setInterval(() => {
      setShow(!show);
    }, 100)

    return () => clearInterval(ref);
  }, [text, show]);

  return (
    <span style={{ visibility: show ? 'visible' : 'hidden' }}>{text}</span>
  )
}

function Copy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(renderData(text));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 700);
  };

  return <button
    type="button"
    onClick={onCopy}
    className="absolute right-5 inline-flex items-center rounded-md border border-transparent bg-slate-600 px-3 py-1 text-xs font-medium leading-4 text-slate-400 shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-slate-500 focus:ring-offset-2 top-5"
  >
    {copied ? ' Copied ' : text}
  </button>
}

function Ticker({ text }: { text: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const ref = setInterval(() => {
      setIndex((index + 1) % text.length);
    }, 50)

    return () => clearInterval(ref);
  }, [index, text]);

  const chars = text.substring(0, index) + '*' + text.substring(index);

  return (
    <span>{chars}</span>
  )
}
