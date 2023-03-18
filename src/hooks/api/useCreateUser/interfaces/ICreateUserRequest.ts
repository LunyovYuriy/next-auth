import IRequestOptions from '@/src/interfaces/IRequestOptions';

interface ICreateUserRequest {
  data: {
    email: string;
    password: string;
  };
  options?: IRequestOptions;
}

export default ICreateUserRequest;
