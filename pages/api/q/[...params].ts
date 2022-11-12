import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const { ALCHEMY_URL, ETHERSCAN_API_KEY } = process.env;
const cache = new CacheContainer(new MemoryStorage())
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);
const usage = `usage: /contractAddress/functionName/arg1/arg2/...`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const parts = req.query.params;
  if (!parts || !parts.length || !Array.isArray(parts)) {
    return res.status(400).send({ message: `Badly formed url. ${usage}` });
  }

  const [address, fn, ...args] = parts;

  if (!address) {
    return res.status(400).json({ message: `No contract address provided. ${usage}` });
  }

  if (!ethers.utils.isAddress(address)) {
    return res.status(400).json({ message: `${address} isn't a valid contract address` });
  }

  if (!fn) {
    return res.status(400).json({ message: `No function name provided. ${usage}` });
  }

  const abi = await getAbi(address);
  const contract = new ethers.Contract(address, abi, provider);

  if (!contract[fn]) {
    return res.status(400).json({ message: `${fn} isn't a valid function on ${address}` });
  }

  const val = args ? await contract[fn](...args) : await contract[fn]();

  let output = {};
  if (isBigNumber(val)) {
    output = ethers.BigNumber.from(val).toString();
  } else {
    output = val;
  }

  return res.status(200).json({ result: output })
}

async function getAbi(address: string) {
  const abi = await cache.getItem(address);

  if (abi) {
    return abi;
  }

  const rsp = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`);
  const { result } = await rsp.json();
  await cache.setItem(address, JSON.parse(result), { ttl: Number.MAX_VALUE });

  return result;
}

function isBigNumber(val: any): val is ethers.BigNumber {
  try {
    ethers.BigNumber.from(val);
  } catch (e) {
    return false;
  }

  return true;
}