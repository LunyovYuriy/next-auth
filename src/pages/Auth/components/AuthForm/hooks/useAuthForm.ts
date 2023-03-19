import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useCreateUser from '@/src/hooks/api/useCreateUser/useCreateUser';
import { TAuthMode } from '@/src/types/TAuthMode';

function useAuthForm() {
  const router = useRouter();
  const { request: createUserRequest, isLoading } = useCreateUser();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (event: FormEvent, authMode: TAuthMode) => {
    event.preventDefault();

    if (authMode === 'sign-in') {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        router.replace('/profile');
      }
    } else {
      await createUserRequest({
        data: {
          email,
          password,
        },
        options: {
          onSuccess: () => clearForm(),
          onError: (error) => toast.error(error?.data?.message),
        },
      });
    }
  };

  return {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleSubmit,
  };
}

export default useAuthForm;
