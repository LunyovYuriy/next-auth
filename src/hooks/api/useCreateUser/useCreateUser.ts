import ICreateUserRequest from '@/src/hooks/api/useCreateUser/interfaces/ICreateUserRequest';
import useRequest from '@/src/hooks/api/useRequest';

function useCreateUser() {
  const { request, isLoading, data, error } = useRequest();

  const createUser = ({ data, options }: ICreateUserRequest) =>
    request({
      method: 'post',
      url: '/api/auth/signup',
      body: {
        email: data.email,
        password: data.password,
      },
      options,
    });

  return {
    request: createUser,
    isLoading,
    data,
    error,
  };
}

export default useCreateUser;
