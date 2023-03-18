import IRequestError from '@/src/interfaces/IRequestError';

interface IRequestOptions {
  onSuccess?: (data: {}) => void;
  onError?: (error: IRequestError) => void;
}

export default IRequestOptions;
