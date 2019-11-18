import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, Button, Select} from 'antd';
import {ARTISAN_REGISTER} from './graphql/mutations';
import {GET_ORIGINS} from './graphql/queries';

const {Option} = Select;

class ArtisanForm extends Component {
  state = {
    loading: false,
    origins: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    try {
      const {
        data: {origins},
      } = await client.query({
        query: GET_ORIGINS,
        variables: {
          filters: {limit: 10},
        },
      });

      this.setState({origins});
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});

    e.preventDefault();
    form.validateFields(
      async (err, {firstName, lastName, username, email, password, origin}) => {
        if (!err) {
          try {
            const {
              data: {artisan},
            } = await client.mutate({
              mutation: ARTISAN_REGISTER,
              variables: {
                artisan: {
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                  origin,
                },
              },
            });

            this.setState({loading: false});
            toast(`New Artisan code registered: ${artisan.code}`, {
              duration: 3000,
              closeable: true,
            });
            form.resetFields();
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
    const {loading, origins} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {form.getFieldDecorator('firstName', {
            rules: [{required: true, message: 'Please input your name(s)!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="First name(s)"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('lastName', {
            rules: [
              {required: true, message: 'Please input your last name(s)!'},
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Last name(s)"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Username"
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
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('origin', {
            rules: [{required: true, message: 'Please select an Origin!'}],
          })(
            <Select placeholder="Origin">
              {origins.map(({municipality, community, group, code, id}, i) => (
                <Option key={i} value={id}>
                  {`${code} (${municipality}, ${community}, ${group})`}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="artisan-form-button"
            icon="save"
            loading={loading}
          >
            {(loading && 'Wait..') || 'Save'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withApollo(ArtisanForm);
