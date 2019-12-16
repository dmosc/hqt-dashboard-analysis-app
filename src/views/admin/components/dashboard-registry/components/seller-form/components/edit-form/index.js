import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Modal, Form, Input, Icon} from 'antd';
import {SELLER_EDIT} from './graphql/mutations';

const {Password} = Input;

class EditForm extends Component {
  handleSubmit = e => {
    const {
      form,
      currentSeller: {id},
      client,
    } = this.props;

    e.preventDefault();
    form.validateFields(async (err, {firstName, username, email, password}) => {
      if (!err) {
        try {
          await client.mutate({
            mutation: SELLER_EDIT,
            variables: {
              seller: {id, firstName, username, email, password},
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
    });
  };

  handleCancel = () => {
    const {setCurrentSeller} = this.props;

    setCurrentSeller();
  };

  render() {
    const {form, currentSeller} = this.props;

    return (
      <Modal
        title={`Editando vendedor: ${currentSeller.firstName}`}
        visible={currentSeller !== null}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('firstName', {
              initialValue: currentSeller.firstName,
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('username', {
              initialValue: currentSeller.username,
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de usuario"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('email', {
              initialValue: currentSeller.email,
            })(
              <Input
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              initialValue: currentSeller.password,
            })(
              <Password
                prefix={
                  <Icon type="question" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Contraseña"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withApollo(EditForm);
