import { useState } from 'react';
import apiRequest from '@/src/helpers/api';
import IRequest from '@/src/interfaces/IRequest';

function useRequest() {
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<any>(null);
  const [requestError, setRequestError] = useState<any>(null);

  const request = async ({ method, url, body, options }: IRequest) => {
    setRequestLoading(true);
    try {
      const result = await apiRequest?.[method](url, body);

      setRequestLoading(false);
      setRequestData(result);

      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (error: any) {
      setRequestLoading(false);
      setRequestError(error);

      if (options?.onError) {
        options.onError(error);
      }

      return error;
    }
  };

  return {
    request,
    isLoading: requestLoading,
    error: requestError,
    data: requestData,
  };
}

export default useRequest;
