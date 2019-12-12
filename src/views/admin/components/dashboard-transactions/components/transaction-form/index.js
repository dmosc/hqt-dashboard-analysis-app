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

<<<<<<< HEAD
            toast(`Nueva transacción registrada: ${transaction.name}`, {
              duration: 3000,
              closeable: true,
            });
=======
>>>>>>> 6eab12316f0284aa5d2aa1e60c904d6f2023fcf7
            form.resetFields();
            window.location.reload();
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
<<<<<<< HEAD
              rules: [{required: true, message: 'Fecha requerida!'}],
=======
              rules: [
                {
                  required: true,
                  message: 'La fecha de recepción es requerida!',
                },
              ],
>>>>>>> 6eab12316f0284aa5d2aa1e60c904d6f2023fcf7
            })(<DatePicker placeholder="Fecha" />)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('name', {
<<<<<<< HEAD
              rules: [{required: true, message: 'Ingrese el nombre!'}],
=======
              rules: [
                {
                  required: true,
                  message: 'Nombre de transacción es requerido!',
                },
              ],
>>>>>>> 6eab12316f0284aa5d2aa1e60c904d6f2023fcf7
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de la transacción"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('description', {
<<<<<<< HEAD
              rules: [{required: true, message: 'Una descripción es requerida!'}],
=======
              rules: [
                {required: true, message: 'Descripción de la transacción!'},
              ],
>>>>>>> 6eab12316f0284aa5d2aa1e60c904d6f2023fcf7
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
<<<<<<< HEAD
              rules: [{required: true, message: 'Precio faltante!'}],
            })(
              <InputNumber
                style={{width: '100%'}}
                placeholder="Precio (MXN)"
=======
              rules: [{required: true, message: 'Un monto es requerido!'}],
            })(
              <InputNumber
                style={{width: '100%'}}
                placeholder="$ Monto de la transacción"
>>>>>>> 6eab12316f0284aa5d2aa1e60c904d6f2023fcf7
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
              {(loading && 'Espere..') || 'Guardar'}
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export default withApollo(TransactionForm);
