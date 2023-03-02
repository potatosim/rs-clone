import { useLocation } from 'react-router-dom';

const useQueryParams = (): URLSearchParams => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

const useQueryParam = (key: string): string | null => {
  const params = useQueryParams();
  return params.get(key);
};

export { useQueryParams };

export default useQueryParam;
