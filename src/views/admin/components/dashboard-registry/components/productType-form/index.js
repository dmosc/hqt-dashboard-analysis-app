import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Select, Button, Input, Icon} from 'antd';
import ListContainer from './components/list';
import EditForm from './components/edit-form';
import {PRODUCT_TYPE_REGISTER} from './graphql/mutations';
import {GET_PRODUCT_TYPES, GET_SELLERS} from './graphql/queries';

const {Option} = Select;

class ProductTypeForm extends Component {
  state = {
    loading: false,
    codeSuggestion: '',
    loadingProductTypes: false,
    productTypes: [],
    currentProductType: null,
    sellers: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingProductTypes: true});

    try {
      const [
        {
          data: {productTypes},
        },
        {
          data: {sellersOnly: sellers},
        },
      ] = await Promise.all([
        client.query({
          query: GET_PRODUCT_TYPES,
          variables: {
            filters: {},
          },
        }),
        client.query({
          query: GET_SELLERS,
          variables: {
            filters: {},
          },
        }),
      ]);

      this.setState({productTypes, sellers, loadingProductTypes: false});
    } catch (e) {
      this.setState({loadingProductTypes: false});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    const {productTypes: oldProductTypes} = this.state;

    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {name, code, beneficiary}) => {
      const beneficiaryId =
        beneficiary !== null
          ? beneficiary.substring(beneficiary.indexOf(':') + 1)
          : undefined;

      if (!err) {
        try {
          const {
            data: {productType},
          } = await client.mutate({
            mutation: PRODUCT_TYPE_REGISTER,
            variables: {
              productType: {
                name,
                code: code.toString().toUpperCase(),
                beneficiary: beneficiaryId,
              },
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
          window.location.reload();
        } catch (e) {
          toast(e, 'error', {duration: 3000, closeable: true});
          this.setState({loading: false});
        }
      } else {
        this.setState({loading: false});
      }
    });
  };

  setCurrentProductType = currentProductType =>
    this.setState({currentProductType});

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
      currentProductType,
      sellers,
    } = this.state;

    const ProductTypeEditForm = Form.create({name: 'productTypeEdit'})(
      EditForm
    );

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('name', {
              rules: [{required: true, message: 'Name is required!'}],
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre del tipo de producto"
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
            {form.getFieldDecorator('beneficiary', {initialValue: null})(
              <Select showSearch placeholder="Beneficiario">
                <Option value={null}>Artesanas</Option>
                {sellers.map(({id, username}) => (
                  <Option value={`${username}:${id}`}>{username}</Option>
                ))}
              </Select>
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
                <List.Item
                  actions={[
                    <Icon
                      type="edit"
                      onClick={() => this.setCurrentProductType(productType)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={productType.code}
                    description={`${productType.name}`}
                  />
                </List.Item>
              )}
            />
          )) ||
            'Ningún tipo de producto registrado'}
          {currentProductType && (
            <ProductTypeEditForm
              setCurrentProductType={this.setCurrentProductType}
              currentProductType={currentProductType}
            />
          )}
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(ProductTypeForm);
