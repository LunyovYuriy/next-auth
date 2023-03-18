import IRequestOptions from '@/src/interfaces/IRequestOptions';

interface IRequest {
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  body: {};
  options?: IRequestOptions;
}

export default IRequest;
