interface ICreateUserRequest {
  data: {
    email: string;
    password: string;
  };
  options?: {
    onSuccess?: () => void;
    onError?: () => void;
  };
}

export default ICreateUserRequest;
