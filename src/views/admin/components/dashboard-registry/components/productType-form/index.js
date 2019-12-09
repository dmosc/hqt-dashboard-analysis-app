import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Icon, Input, Button} from 'antd';
import ListContainer from './components/list';
import {PRODUCT_TYPE_REGISTER} from './graphql/mutations';
import {GET_PRODUCT_TYPES} from './graphql/queries';

class ProductTypeForm extends Component {
  state = {
    loading: false,
    loadingProductTypes: false,
    productTypes: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingProductTypes: true});

    try {
      const {
        data: {productTypes},
      } = await client.query({
        query: GET_PRODUCT_TYPES,
        variables: {
          filters: {},
        },
      });

      if (!productTypes) this.setState({loadingProductTypes: false});

      this.setState({productTypes, loadingProductTypes: false});
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    const {productTypes: oldProductTypes} = this.state;

    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {name, code}) => {
      if (!err) {
        try {
          const {
            data: {productType},
          } = await client.mutate({
            mutation: PRODUCT_TYPE_REGISTER,
            variables: {
              productType: {name, code},
            },
          });

          this.setState({loading: false});
          toast(`Nuevo tipo de producto registrado: ${productType.code}`, {
            duration: 3000,
            closeable: true,
          });

          const productTypes = [...oldProductTypes];
          productTypes.unshift(productType);

          this.setState({productTypes});

          form.resetFields();
        } catch (e) {
          toast(e, 'error', {duration: 3000, closeable: true});
          this.setState({loading: false});
        }
      } else {
        this.setState({loading: false});
      }
    });
  };

  render() {
    const {form} = this.props;
    const {loading, loadingProductTypes, productTypes} = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('name', {
              rules: [{required: true, message: 'Name is required!'}],
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de tipo de prenda"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('code', {
              rules: [{required: true, message: 'Code is required!'}],
            })(
              <Input
                prefix={
                  <Icon type="highlight" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Código de referencia"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="productType-form-button"
              icon="save"
              loading={loading}
            >
              {(loading && 'Wait..') || 'Save'}
            </Button>
          </Form.Item>
        </Form>
        <ListContainer title="Tipos de producto registrados">
          {(productTypes && (
            <List
              loading={loadingProductTypes}
              itemLayout="horizontal"
              dataSource={productTypes}
              size="small"
              renderItem={productType => (
                <List.Item actions={[<Icon type="edit" />]}>
                  <List.Item.Meta
                    title={productType.code}
                    description={`${productType.name}`}
                  />
                </List.Item>
              )}
            />
          )) ||
            'Ningún tipo de producto registrado'}
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(ProductTypeForm);
