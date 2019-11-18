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
    const {form, client} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(
      async (
        e,
        {productName, productType, dateReceived, retailPrice, artisan, location}
      ) => {
        if (!e) {
          const [artisanId, originId] = artisan.split(':');

          try {
            const {
              data: {product},
            } = await client.mutate({
              mutation: PRODUCT_REGISTER,
              variables: {
                product: {
                  productName,
                  productType,
                  dateReceived,
                  retailPrice,
                  artisan: artisanId,
                  origin: originId,
                  location,
                },
              },
            });

            this.setState({loading: false});
            toast(`New product registered: ${product.code}`, {
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
    const {form, artisans, locations} = this.props;
    const {loading} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="product-form">
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
            <Input
              prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Type of product"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('dateReceived', {
            rules: [{required: true, message: 'A date is required!'}],
          })(<DatePicker placeholder="Date received" />)}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator('retailPrice', {
            rules: [{required: true, message: 'A retail price is required!'}],
          })(
            <InputNumber
              style={{width: '100%'}}
              placeholder="$ Retail price"
              min={0}
              step={0.1}
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
            className="location-form-button"
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

export default withApollo(ProductForm);
