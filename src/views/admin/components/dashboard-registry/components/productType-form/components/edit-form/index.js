import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Modal, Form, Input, Icon} from 'antd';
import {PRODUCT_TYPE_EDIT} from './graphql/mutations';

class EditForm extends Component {
  state = {
    codeSuggestion: '',
  };

  componentDidMount = () => {
    const {
      currentProductType: {code},
    } = this.props;
    this.setState({codeSuggestion: code});
  };

  handleSubmit = e => {
    const {
      form,
      currentProductType: {id},
      client,
    } = this.props;

    e.preventDefault();
    form.validateFields(async (err, {name, code}) => {
      if (!err) {
        try {
          await client.mutate({
            mutation: PRODUCT_TYPE_EDIT,
            variables: {
              productType: {id, name, code},
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
    const {setCurrentProductType} = this.props;

    setCurrentProductType();
  };

  handleProductTypeChange = productType => {
    if (productType.length > 3)
      this.setState({
        codeSuggestion: productType.substring(0, 3).toUpperCase(),
      });
    else
      this.setState({
        codeSuggestion: '',
      });
  };

  render() {
    const {form, currentProductType} = this.props;
    const {codeSuggestion} = this.state;

    return (
      <Modal
        title={`Editando Tipo de Producto: ${currentProductType.code}`}
        visible={currentProductType !== null}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('name', {
              initialValue: currentProductType.name,
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de tipo de prenda"
                onChange={({target: {value}}) =>
                  this.handleProductTypeChange(value)
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('code', {initialValue: codeSuggestion})(
              <Input
                prefix={
                  <Icon type="highlight" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder={
                  codeSuggestion
                    ? `Sugerencia: ${codeSuggestion}`
                    : 'Código de referencia'
                }
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withApollo(EditForm);
