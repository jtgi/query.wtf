import { useState, useEffect } from "react";

export function useQuery<T = any, K = any>(fn: () => Promise<T>) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<K>();
  const [data, setData] = useState<T>();

  useEffect(() => {
    const exec = async () => {
      setLoading(true);
      setError(undefined);
      setData(undefined);

      try {
        const rsp = await fn();
        setData(rsp);
      } catch (e: any) {
        console.error(e);
        setError(e)
      }

      setLoading(false);
    }

    exec();
  }, []);

  return { isLoading, error, data };
}