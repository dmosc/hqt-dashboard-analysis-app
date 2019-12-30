import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, InputNumber, Select, Button, DatePicker} from 'antd';
import {GARMENT_REGISTER} from './graphql/mutations';

const {Option} = Select;

class GarmentForm extends Component {
  state = {
    loading: false,
    weight: 0,
    rawMaterialsPrice: 0,
    workforceCost: 0,
    totalHoursToProduce: 0,
    productionPrice: 0,
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
          artisan,
          location,
          weight,
          rawMaterialsPrice,
          workforceCost,
          totalHoursToProduce,
          productionPrice,
          commission,
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
            totalHoursToProduce,
            productionPrice,
            commission,
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
            if (location) handleNewProduct(newGarment, 'stock');
            else handleNewProduct(newGarment, 'production');

            toast(`New garment registered: ${newGarment.code}`, {
              duration: 3000,
              closeable: true,
            });

            form.resetFields();
            window.location.reload();
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

  handleChange = (key, val) =>
    this.setState({[key]: val}, this.calculateProductionPrice);

  calculateProductionPrice = () => {
    const {
      weight,
      rawMaterialsPrice,
      workforceCost,
      totalHoursToProduce,
    } = this.state;

    const productionPrice =
      totalHoursToProduce * workforceCost + (weight / 1000) * rawMaterialsPrice;

    this.setState({productionPrice});
  };

  render() {
    const {form, artisans, locations, productTypes} = this.props;
    const {loading, productionPrice} = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {form.getFieldDecorator('productName', {
            rules: [
              {required: true, message: 'Nombre de prenda es requerido!'},
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
            rules: [{required: true, message: 'Fecha de recepción!'}],
          })(<DatePicker placeholder="Fecha recibido" />)}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('weight', {
            rules: [
              {required: true, message: 'El peso de la prenda es requerido!'},
            ],
          })(
            <InputNumber
              onChange={value =>
                typeof value === 'number'
                  ? this.handleChange('weight', value)
                  : null
              }
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
              {required: true, message: 'Costo de materia prima es requerido!'},
            ],
          })(
            <InputNumber
              onChange={value =>
                typeof value === 'number'
                  ? this.handleChange('rawMaterialsPrice', value)
                  : null
              }
              style={{width: '100%'}}
              placeholder="$ Costo de materia prima en MXN/KG"
              min={0}
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('workforceCost', {
            rules: [
              {
                required: true,
                message: 'Costo de mano de obra por hora es requerido!',
              },
            ],
          })(
            <InputNumber
              onChange={value =>
                typeof value === 'number'
                  ? this.handleChange('workforceCost', value)
                  : null
              }
              style={{width: '100%'}}
              placeholder="Mano de obra en MXN/HR"
              min={0}
              step={0.5}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('totalHoursToProduce', {
            rules: [
              {
                required: true,
                message: 'Horas totales de producción son requeridos!',
              },
            ],
          })(
            <InputNumber
              onChange={value =>
                typeof value === 'number'
                  ? this.handleChange('totalHoursToProduce', value)
                  : null
              }
              style={{width: '100%'}}
              placeholder="Horas totales de producción"
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
              {artisans.map(({id, username, code, origin}, i) => (
                <Option key={i} value={`${id}:${origin.id}`}>
                  {`${code} ${username}`}
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
                message: 'Seleccione la ubicación actual de la prenda!',
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
        <Form.Item
          label="Precio de producción"
          style={{color: 'rgba(0,0,0,.25)'}}
        >
          {form.getFieldDecorator('productionPrice', {
            initialValue: productionPrice,
          })(
            <InputNumber
              onChange={value =>
                typeof value === 'number'
                  ? this.handleChange('productionPrice', value)
                  : null
              }
              style={{width: '100%'}}
              placeholder={
                productionPrice === 0 ? 'Costo de producción' : productionPrice
              }
              min={0}
              step={0.1}
            />
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
