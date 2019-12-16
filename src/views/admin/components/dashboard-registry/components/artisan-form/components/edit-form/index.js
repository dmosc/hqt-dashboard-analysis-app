import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Modal, Form, Input, Select, Icon} from 'antd';
import {ARTISAN_EDIT} from './graphql/mutations';

const {Option} = Select;

class EditForm extends Component {
  handleSubmit = e => {
    const {
      form,
      currentArtisan: {id},
      client,
    } = this.props;

    e.preventDefault();
    form.validateFields(
      async (err, {firstName, lastName, username, email, password, origin}) => {
        if (!err) {
          try {
            await client.mutate({
              mutation: ARTISAN_EDIT,
              variables: {
                artisan: {
                  id,
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                  origin,
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
    const {setCurrentArtisan} = this.props;

    setCurrentArtisan();
  };

  render() {
    const {form, currentArtisan, origins} = this.props;

    return (
      <Modal
        title={`Editando artesana: ${currentArtisan.code}`}
        visible={currentArtisan !== null}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('firstName', {
              initialValue: currentArtisan.firstName,
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombres"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('lastName', {
              initialValue: currentArtisan.lastName,
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Apellidos"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('username', {
              initialValue: currentArtisan.username,
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de usuario"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('email', {
              initialValue: currentArtisan.email,
            })(
              <Input
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              initialValue: currentArtisan.password,
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Contraseña"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('origin', {
              initialValue: currentArtisan.origin.id,
            })(
              <Select placeholder="Origin">
                {origins.map(
                  ({municipality, community, group, code, id}, i) => (
                    <Option key={i} value={id}>
                      {`${code} (${municipality}, ${community}, ${group})`}
                    </Option>
                  )
                )}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withApollo(EditForm);
