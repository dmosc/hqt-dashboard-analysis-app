import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, Radio, Button, DatePicker, InputNumber} from 'antd';
import {TRANSACTION_REGISTER} from './graphql/mutations';

const {Group} = Radio;
const {TextArea} = Input;

class TransactionForm extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, client, handleNewTransaction} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(
      async (err, {type, paymentMethod, date, name, description, amount}) => {
        if (!err) {
          try {
            const {
              data: {transaction},
            } = await client.mutate({
              mutation: TRANSACTION_REGISTER,
              variables: {
                transaction: {
                  type,
                  paymentMethod,
                  date,
                  name,
                  description,
                  amount,
                },
              },
            });

            this.setState({loading: false});
            handleNewTransaction(transaction);

            toast(`New transaction registered: ${transaction.name}`, {
              duration: 3000,
              closeable: true,
            });
            form.resetFields();
          } catch (e) {
            toast(e, 'error', {duration: 3000, closeable: true});
            this.setState({loading: false});
          }
        } else {
          this.setState({loading: false});
        }
      }
    );
  };

  render() {
    const {form} = this.props;
    const {loading} = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('type')(
              <Group>
                <Radio.Button value="IN">Entrada</Radio.Button>
                <Radio.Button value="OUT">Salida</Radio.Button>
              </Group>
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('paymentMethod')(
              <Group>
                <Radio.Button value="CASH">Cash</Radio.Button>
                <Radio.Button value="IZETTLE">iZettle</Radio.Button>
                <Radio.Button value="CLIP">Clip</Radio.Button>
                <Radio.Button value="OTHER">Other</Radio.Button>
              </Group>
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('date', {
              rules: [{required: true, message: 'A date is required!'}],
            })(<DatePicker placeholder="Fecha" />)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('name', {
              rules: [{required: true, message: 'A name is required!'}],
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de la transacción"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('description', {
              rules: [{required: true, message: 'A description is required!'}],
            })(
              <TextArea
                allowClear
                placeholder="Descripción de la transacción"
                autoSize={{minRows: 2, maxRows: 4}}
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('amount', {
              rules: [{required: true, message: 'An amount is required!'}],
            })(
              <InputNumber
                style={{width: '100%'}}
                placeholder="$ Retail price"
                min={0}
                step={0.1}
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
      </React.Fragment>
    );
  }
}

export default withApollo(TransactionForm);
