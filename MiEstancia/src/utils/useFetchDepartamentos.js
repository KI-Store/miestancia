import { useEffect } from 'react';
import { useStateSpiner } from '../store/estadoSpiner';

export const useSpinnerFetch = (queryFn, onSuccess) => {
  const { setVisibleShow, setVisibleHidden } = useStateSpiner();

  useEffect(() => {
    const fetchData = async () => {
      setVisibleShow();
      try {
        const { data, error } = await queryFn();
        if (error) throw error;
        onSuccess(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setVisibleHidden();
      }
    };

    fetchData();
  }, []);
};