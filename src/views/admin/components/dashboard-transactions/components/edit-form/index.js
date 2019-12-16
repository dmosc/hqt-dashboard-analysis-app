import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import moment from 'moment';
import toast from 'toast-me';
import {Modal, Form, Icon, Input, Radio, DatePicker, InputNumber} from 'antd';
import {TRANSACTION_EDIT} from './graphql/mutations';

const {Group} = Radio;
const {TextArea} = Input;

class EditForm extends Component {
  handleSubmit = e => {
    const {
      form,
      currentTransaction: {id},
      client,
    } = this.props;

    e.preventDefault();
    form.validateFields(
      async (err, {type, paymentMethod, date, name, description, amount}) => {
        if (!err) {
          try {
            await client.mutate({
              mutation: TRANSACTION_EDIT,
              variables: {
                transaction: {
                  id,
                  type,
                  paymentMethod,
                  date,
                  name,
                  description,
                  amount,
                },
              },
            });

            window.location.reload();
          } catch (e) {
            e['graphQLErrors'].map(({message}) =>
              toast(message, 'error', {duration: 3000, closeable: true})
            );
          }
        } else {
          toast('No se ha podido actualizar correctamente', 'error', {
            duration: 3000,
            closeable: true,
          });
        }
      }
    );
  };

  handleCancel = () => {
    const {setCurrentTransaction} = this.props;

    setCurrentTransaction();
  };

  render() {
    const {form, currentTransaction} = this.props;

    return (
      <Modal
        title={`Editando transacción: ${currentTransaction.name}`}
        visible={currentTransaction !== null}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('type', {
              initialValue: currentTransaction.type,
            })(
              <Group>
                <Radio.Button value="IN">Entrada</Radio.Button>
                <Radio.Button value="OUT">Salida</Radio.Button>
              </Group>
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('paymentMethod', {
              initialValue: currentTransaction.paymentMethod,
            })(
              <Group>
                <Radio.Button value="CASH">Cash</Radio.Button>
                <Radio.Button value="IZETTLE">iZettle</Radio.Button>
                <Radio.Button value="CLIP">Clip</Radio.Button>
                <Radio.Button value="PAYPAL">Paypal</Radio.Button>
                <Radio.Button value="TRANSFER">Transfer</Radio.Button>
                <Radio.Button value="OTHER">Other</Radio.Button>
              </Group>
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('date', {
              initialValue: moment(currentTransaction.date),
            })(<DatePicker placeholder="Fecha" />)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('name', {
              initialValue: currentTransaction.name,
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de la transacción"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('description', {
              initialValue: currentTransaction.description,
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
              initialValue: currentTransaction.amount,
            })(
              <InputNumber
                style={{width: '100%'}}
                placeholder="$ Monto de la transacción"
                min={0}
                step={0.1}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withApollo(EditForm);
