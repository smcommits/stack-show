import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchSearch } from '../fetch/movieDB';

export default function CustomSearchHook(query) {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setOptions([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const { CancelToken } = axios;
    const source = CancelToken.source();

    fetchSearch(query, source.token)
      .then((res) => {
        setOptions(res.data.results.splice(0, 5));
        setLoading(false);
      }).catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => source.cancel();
  }, [query]);

  return {
    loading, error, options,
  };
}

