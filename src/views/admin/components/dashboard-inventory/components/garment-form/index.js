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
            rules: [{required: true, message: 'Name is required!'}],
          })(
            <Input
              prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Name of the product"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('productType', {
            rules: [{required: true, message: 'Product type is required!'}],
          })(
            <Select placeholder="Product Type">
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
            rules: [{required: true, message: 'A date is required!'}],
          })(<DatePicker placeholder="Date received" />)}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('weight', {
            rules: [{required: true, message: 'Garment weight is required!'}],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Garment weight in grams"
              min={0}
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('rawMaterialsPrice', {
            rules: [
              {required: true, message: 'Raw materials costs is required!'},
            ],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="$ Raw materials costs in MXN"
              min={0}
              step={0.1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('workforceCost', {
            rules: [
              {required: true, message: 'Current workforce is required!'},
            ],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Current workforce cost in MXN/HR"
              min={0}
              step={0.5}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('totalDaysToProduce', {
            rules: [
              {required: true, message: 'Total days to produce is required!'},
            ],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="Total days of work registered"
              min={1}
              step={1}
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('artisan', {
            rules: [{required: true, message: 'Please select an Artisan!'}],
          })(
            <Select placeholder="Artisan">
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
                message: 'Please select current Location of product!',
              },
            ],
          })(
            <Select placeholder="Location">
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
            {(loading && 'Wait..') || 'Save'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withApollo(GarmentForm);
