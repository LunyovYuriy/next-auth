import apiRequest from '@/src/helpers/api';
import { useState } from 'react';
import ICreateUserRequest from '@/src/hooks/api/useCreateUser/interfaces/ICreateUserRequest';

function useCreateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = ({ data, options }: ICreateUserRequest) => {
    setIsLoading(true);
    try {
      const result = apiRequest.post('/api/auth/signup', {
        email: data.email,
        password: data.password,
      });

      setIsLoading(false);

      if (options?.onSuccess) {
        options.onSuccess();
      }

      return result;
    } catch (error) {
      setIsLoading(false);

      if (options?.onError) {
        options.onError();
      }

      return error;
    }
  };

  return {
    request,
    isLoading,
  };
}

export default useCreateUser;
