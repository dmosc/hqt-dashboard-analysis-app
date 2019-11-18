import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form} from 'antd';
import Login from './components/login';
import Register from './components/register';
import Container from 'components/common/container';

class Auth extends Component {
  state = {
    form: 'login',
  };

  handleFormType = form => this.setState({form});

  render() {
    const {form} = this.state;
    const UserLoginForm = Form.create({name: 'login'})(Login);
    const UserRegisterForm = Form.create({name: 'login'})(Register);

    return (
      <Container>
        {form === 'login' ? <UserLoginForm /> : <UserRegisterForm />}
        {form === 'login' ? (
          <Link to="#" onClick={() => this.handleFormType('register')}>
            Register
          </Link>
        ) : (
          <Link to="#" onClick={() => this.handleFormType('login')}>
            Login
          </Link>
        )}
      </Container>
    );
  }
}

export default Auth;
