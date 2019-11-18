import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, Button, InputNumber} from 'antd';
import {ORIGIN_REGISTER} from './graphql/mutations';

class OriginForm extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {municipality, community, group}) => {
      if (!err) {
        try {
          const {
            data: {origin},
          } = await client.mutate({
            mutation: ORIGIN_REGISTER,
            variables: {
              origin: {municipality, community, group},
            },
          });

          this.setState({loading: false});
          toast(`New code registered: ${origin.code}`, {
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
      <Form onSubmit={this.handleSubmit} className="origin-form">
        <Form.Item>
          {form.getFieldDecorator('municipality', {
            rules: [{required: true, message: 'Municipality is required!'}],
          })(
            <Input
              prefix={<Icon type="cloud" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Municipality"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('community', {
            rules: [{required: true, message: 'Community is required!'}],
          })(
            <Input
              prefix={<Icon type="team" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Community"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('group', {
            rules: [{required: true, message: 'Group number is required!'}],
          })(
            <InputNumber
              prefix={<Icon type="number" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Group"
              min={0}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="origin-form-button"
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

export default withApollo(OriginForm);
