import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, InputNumber, Select, Button, DatePicker} from 'antd';
import {GARMENT_REGISTER} from './graphql/mutations';

const {Option} = Select;

class GarmentForm extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(
      async (
        e,
        {
          productName,
          productType,
          dateReceived,
          artisan,
          location,
          weight,
          rawMaterialsPrice,
          workforceCost,
          totalDaysToProduce,
        }
      ) => {
        if (!e) {
          const [artisanId, originId] = artisan.split(':');
          const garment = {
            productName,
            productType,
            dateReceived,
            artisan: artisanId,
            origin: originId,
            weight,
            rawMaterialsPrice,
            workforceCost,
            totalDaysToProduce,
          };

          if (location) garment.location = location;

          try {
            const {
              data: {garment: newGarment},
            } = await client.mutate({
              mutation: GARMENT_REGISTER,
              variables: {
                garment,
              },
            });

            this.setState({loading: false});
            toast(`New garment registered: ${newGarment.code}`, {
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
      }
    );
  };

  render() {
    const {form, artisans, locations, productTypes} = this.props;
    const {loading} = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {form.getFieldDecorator('productName', {
            rules: [{required: true, message: 'Ingrese el nombre!'}],
          })(
            <Input
              prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Nombre del producto"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('productType', {
            rules: [{required: true, message: 'Tipo de producto es requerido!'}],
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
            rules: [{required: true, message: 'La fecha es requerida!'}],
          })(<DatePicker placeholder="Fecha de entrega" />)}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('weight', {
            rules: [{required: true, message: 'El peso es requerido!'}],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Peso de la prenda en gramos"
              min={0}
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('rawMaterialsPrice', {
            rules: [
              {required: true, message: 'El costo de los materiales es necesario!'},
            ],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="$ Costo de los materiales en MXN"
              min={0}
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('workforceCost', {
            rules: [
              {required: true, message: 'El costo de la mano de obra es requerido!'},
            ],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Costo de mano de obra MXN/HR"
              min={0}
              step={0.5}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('totalDaysToProduce', {
            rules: [
              {required: true, message: 'El tiempo de trabajo es requerido'},
            ],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Tiempo de producción (días)"
              min={1}
              step={1}
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
                message: 'Seleccione el lugar del producto!',
              },
            ],
          })(
            <Select placeholder="Lugar">
              <Option key={-1} value={0}>
                None
              </Option>
              {locations.map(({id, name}, i) => (
                <Option key={i} value={id}>
                  {`${name}`}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
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

export default withApollo(GarmentForm);
