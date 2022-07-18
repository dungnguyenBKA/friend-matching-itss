import React from 'react';
import Column from '../../components/Column/Column';
import useAuth from '../../hooks/useAuth';

function LoginPage() {
  const { signIn } = useAuth();
  return (
    <Column>
      <p>Login page</p>
      <button
        onClick={() => {
          signIn({
            name: 'Dung Nguyen BKA',
            email: 'dungg.nm@gmail.com',
          });
        }}
      >
        Demo login
      </button>

      <p>enter username, pass ....</p>
    </Column>
  );
}

export default LoginPage;
