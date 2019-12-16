import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Modal, Form, Input, InputNumber, Icon} from 'antd';
import {ORIGIN_EDIT} from './graphql/mutations';

class EditForm extends Component {
  handleSubmit = e => {
    const {
      form,
      currentOrigin: {id},
      client,
    } = this.props;

    e.preventDefault();
    form.validateFields(async (err, {municipality, community, group}) => {
      if (!err) {
        try {
          await client.mutate({
            mutation: ORIGIN_EDIT,
            variables: {
              origin: {id, municipality, community, group},
            },
          });

          form.resetFields();
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
    const {setCurrentOrigin} = this.props;

    setCurrentOrigin();
  };

  render() {
    const {form, currentOrigin} = this.props;

    return (
      <Modal
        title={`Editando origen: ${currentOrigin.code}`}
        visible={currentOrigin !== null}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('municipality', {
              initialValue: currentOrigin.municipality,
            })(
              <Input
                prefix={
                  <Icon type="cloud" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Municipality"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('community', {
              initialValue: currentOrigin.community,
            })(
              <Input
                prefix={<Icon type="team" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Community"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('group', {
              initialValue: currentOrigin.group,
            })(
              <InputNumber
                prefix={
                  <Icon type="number" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Group"
                min={0}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withApollo(EditForm);
