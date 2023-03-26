import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import useRequest from '@/src/hooks/api/useRequest';

function useProfileForm() {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const { request, isLoading } = useRequest();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await request({
      method: 'patch',
      url: '/api/user/change-password',
      body: {
        oldPassword,
        newPassword,
      },
      options: {
        onSuccess: () => toast.success('Password updated successfully!'),
        onError: (error) => toast.error(error?.data?.message),
      },
    });
  };

  return {
    oldPassword,
    newPassword,
    isLoading,

    setOldPassword,
    setNewPassword,
    onSubmit,
  };
}

export default useProfileForm;
