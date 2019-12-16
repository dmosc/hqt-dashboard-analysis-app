import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, InputNumber, Select, Button, DatePicker} from 'antd';
import {PRODUCT_REGISTER} from './graphql/mutations';

const {Option} = Select;

class ProductForm extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, client, handleNewProduct} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(
      async (
        e,
        {
          productName,
          productType,
          dateReceived,
          retailPrice,
          artisan,
          location,
          commission,
        }
      ) => {
        if (!e) {
          const [artisanId, originId] = artisan.split(':');
          const product = {
            productName,
            productType,
            dateReceived,
            retailPrice,
            artisan: artisanId,
            origin: originId,
            commission,
          };

          if (location) product.location = location;

          try {
            const {
              data: {product: newProduct},
            } = await client.mutate({
              mutation: PRODUCT_REGISTER,
              variables: {
                product,
              },
            });

            this.setState({loading: false});
            if (location) handleNewProduct(newProduct, 'stock');
            else handleNewProduct(newProduct, 'production');

            toast(`New product registered: ${newProduct.code}`, {
              duration: 3000,
              closeable: true,
            });

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
    const {form, artisans, locations, productTypes} = this.props;
    const {loading} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="product-form">
        <Form.Item>
          {form.getFieldDecorator('productName', {
            rules: [
              {required: true, message: 'Nombre del producto es requerido!'},
            ],
          })(
            <Input
              prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Nombre del producto"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('productType', {
            rules: [
              {required: true, message: 'Tipo de producto es requerido!'},
            ],
          })(
            <Select placeholder="Tipo de producto">
              {productTypes.map(({id, name, code}, i) => (
                <Option key={i} value={id}>
                  {`${code} : ${name}`}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('dateReceived', {
            rules: [
              {required: true, message: 'Fecha de recepción es requerida!'},
            ],
          })(<DatePicker placeholder="Fecha recibido" />)}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('retailPrice', {
            rules: [{required: true, message: 'Precio de venta es requerido!'}],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="$ Precio de venta"
              min={0}
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('artisan', {
            rules: [{required: true, message: 'Seleccione una artesana!'}],
          })(
            <Select placeholder="Artesana">
              {artisans.map(({id, firstName, lastName, origin}, i) => (
                <Option key={i} value={`${id}:${origin.id}`}>
                  {`${origin.code} ${lastName} ${firstName[0]}.`}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('location', {
            rules: [
              {
                required: true,
                message: 'Seleccione la ubicación actual del producto!',
              },
            ],
          })(
            <Select placeholder="Ubicación actual">
              <Option key={-1} value={0}>
                No la hemos recibido
              </Option>
              {locations.map(({id, name}, i) => (
                <Option key={i} value={id}>
                  {`${name}`}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Comisión" style={{color: 'rgba(0,0,0,.25)'}}>
          {form.getFieldDecorator('commission', {initialValue: 0})(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Comisión en MXN"
              min={0}
              step={0.1}
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
            {(loading && 'Espere..') || 'Guardar'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withApollo(ProductForm);
