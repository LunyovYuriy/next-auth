import { useState } from 'react';
import { TAuthMode } from '@/src/types/TAuthMode';

function useAuthMode() {
  const [authMode, setAuthMode] = useState<TAuthMode>('sign-in');

  const switchAuthMode = () => {
    if (authMode === 'sign-in') {
      setAuthMode('sign-up');
    } else {
      setAuthMode('sign-in');
    }
  };

  const headerText = {
    'sign-in': 'Login',
    'sign-up': 'Sign Up',
  };

  const submitText = {
    'sign-in': 'Login',
    'sign-up': 'Create Account',
  };

  const switcherText = {
    'sign-in': 'Create new account',
    'sign-up': 'Login with existing account',
  };

  return {
    authMode,
    headerText: headerText[authMode],
    submitText: submitText[authMode],
    switcherText: switcherText[authMode],
    switchAuthMode,
  };
}

export default useAuthMode;
