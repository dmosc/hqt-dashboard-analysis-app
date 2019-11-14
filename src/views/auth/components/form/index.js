import React from 'react';
import {withApollo} from 'react-apollo';
import {withRouter} from 'react-router';
import toast from 'toast-me';
import cookie from 'react-cookies';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {USER_LOGIN} from './graphql/queries';

const handleSubmit = (e, form, client, history) => {
  e.preventDefault();
  form.validateFields(async (err, {username, password}) => {
    if (!err) {
      try {
        const {
          data: {login: token}
        } = await client.mutate({
          mutation: USER_LOGIN,
          variables: {user: {usernameOrEmail: username, password}}
        });

        cookie.save('token', token, {
          path: '/',
          expires: new Date().setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        });

        window.location.reload();
      } catch (e) {
        e['graphQLErrors'].map(({message}) =>
          toast(message, 'error', {duration: 3000, closeable: true})
        );
      }
    } else {
      toast(err, 'error', {duration: 3000, closeable: true});
    }
  });
};

const Login = ({form, client, history, handleUser}) => {
  return (
    <Form
      onSubmit={e => handleSubmit(e, form, client, history, handleUser)}
      className="login-form"
    >
      <Form.Item>
        {form.getFieldDecorator('username', {
          rules: [{required: true, message: 'Please input your username!'}]
        })(
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('password', {
          rules: [{required: true, message: 'Please input your Password!'}]
        })(
          <Input
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withApollo(withRouter(Login));
