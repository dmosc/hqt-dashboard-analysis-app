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
    codeSuggestion: '',
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

          toast(`Nuevo tipo de producto registrado: ${productType.code}`, {
            duration: 3000,
            closeable: true,
          });

          const productTypes = [...oldProductTypes];
          productTypes.unshift(productType);

          this.setState({loading: false, productTypes});

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
    const {form} = this.props;
    const {
      loading,
      codeSuggestion,
      loadingProductTypes,
      productTypes,
    } = this.state;

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
                onChange={({target: {value}}) =>
                  this.handleProductTypeChange(value)
                }
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
                placeholder={
                  codeSuggestion
                    ? `Sugerencia: ${codeSuggestion}`
                    : 'Código de referencia'
                }
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
