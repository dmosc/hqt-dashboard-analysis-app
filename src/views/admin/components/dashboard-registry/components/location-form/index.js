import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, Button} from 'antd';
import {LOCATION_REGISTER} from './graphql/mutations';

class LocationForm extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {name, address}) => {
      if (!err) {
        try {
          const {
            data: {location},
          } = await client.mutate({
            mutation: LOCATION_REGISTER,
            variables: {
              location: {name, address},
            },
          });

          this.setState({loading: false});
          toast(`New location registered: ${location.name}`, {
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
        this.setState({loading: false});
      }
    });
  };

  render() {
    const {form} = this.props;
    const {loading} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="location-form">
        <Form.Item>
          {form.getFieldDecorator('name', {
            rules: [{required: true, message: 'Name is required!'}],
          })(
            <Input
              prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('address', {
            rules: [{required: true, message: 'Address is required!'}],
          })(
            <Input
              prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Address"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="location-form-button"
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

export default withApollo(LocationForm);
