import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import cookie from 'react-cookies';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {USER_REGISTER} from './graphql/mutations';

class Register extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});

    e.preventDefault();
    form.validateFields(
      async (err, {firstName, lastName, username, email, password}) => {
        if (!err) {
          try {
            const {
              data: {register: token},
            } = await client.mutate({
              mutation: USER_REGISTER,
              variables: {
                user: {firstName, lastName, username, email, password},
              },
            });

            cookie.save('token', token, {
              path: '/',
              expires: new Date().setDate(
                Date.now() + 1000 * 60 * 60 * 24 * 14
              ),
            });

            window.location.reload();
          } catch (e) {
            e['graphQLErrors'].map(({message}) =>
              toast(message, 'error', {duration: 3000, closeable: true})
            );

            this.setState({loading: false});
          }
        } else {
          toast(err, 'error', {duration: 3000, closeable: true});
          this.setState({loading: false});
        }
      }
    );
  };

  render() {
    const {form} = this.props;
    const {loading} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {form.getFieldDecorator('firstName', {
            rules: [{required: true, message: '¡Ingrese sus nombre(s)!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Nombre(s)"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('lastName', {
            rules: [
              {required: true, message: '¡Ingrese sus apellido(s)!'},
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Apellido(s)"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('username', {
            rules: [{required: true, message: '¡Ingrese su usuario!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Usuario"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('email', {
            rules: [{required: true, message: 'Please input your email!'}],
          })(
            <Input
              prefix={<Icon type="email" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
              type="password"
              placeholder="Contraseña"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            icon="login"
            loading={loading}
          >
            {(loading && 'Espere...') || 'Login'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withApollo(Register);
