import React from 'react';
import {Form} from 'antd';
import Login from './components/form';
import Container from 'components/common/container';

const Auth = () => {
  const UserForm = Form.create({name: 'login'})(Login);
  return (
    <Container>
      <UserForm />
    </Container>
  );
};

export default Auth;
