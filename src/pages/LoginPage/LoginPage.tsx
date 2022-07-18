import Login from '../../components/RequireLogin/Login';
import Signup from '../../components/RequireLogin/Signup';
import React, { useState } from 'react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return isLogin ? (
    <Login setIsLogin={setIsLogin} />
  ) : (
    <Signup setIsLogin={setIsLogin} />
  );
};

export default LoginPage;
