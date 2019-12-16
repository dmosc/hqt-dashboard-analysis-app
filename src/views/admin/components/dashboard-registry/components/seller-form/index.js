import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Icon, Input, Button} from 'antd';
import ListContainer from './components/list';
import EditForm from './components/edit-form';
import {SELLER_REGISTER} from './graphql/mutations';
import {GET_SELLERS} from './graphql/queries';

class SellerForm extends Component {
  state = {
    loading: false,
    loadingSellers: false,
    sellers: [],
    currentSeller: null,
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingSellers: true});

    try {
      const {
        data: {sellers},
      } = await client.query({
        query: GET_SELLERS,
        variables: {
          filters: {},
        },
      });

      if (!sellers) throw new Error('No sellers found');

      this.setState({sellers, loadingSellers: false});
    } catch (e) {
      this.setState({loadingSellers: false});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    const {sellers: oldSellers} = this.state;

    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {firstName, username, email}) => {
      if (!err) {
        try {
          const {
            data: {seller},
          } = await client.mutate({
            mutation: SELLER_REGISTER,
            variables: {
              seller: {firstName, username, email},
            },
          });

          const sellers = [...oldSellers];
          sellers.unshift(seller);

          this.setState({loading: false, sellers});

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
    });
  };

  setCurrentSeller = currentSeller => this.setState({currentSeller});

  render() {
    const {form} = this.props;
    const {loading, loadingSellers, sellers, currentSeller} = this.state;

    const SellerEditForm = Form.create({name: 'locationEdit'})(EditForm);

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('firstName', {
              rules: [
                {required: true, message: 'Nombre del vendedor es requerido!'},
              ],
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Un nombre de usuario único es requerido!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre de usuario"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('email')(
              <Input
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password')(
              <Input
                type="password"
                prefix={
                  <Icon type="question" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Contraseña"
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
              {(loading && 'Wait..') || 'Save'}
            </Button>
          </Form.Item>
        </Form>
        <ListContainer title="Vendedores registrados">
          <List
            loading={loadingSellers}
            itemLayout="horizontal"
            dataSource={sellers}
            size="small"
            renderItem={seller => (
              <List.Item
                actions={[
                  <Icon
                    type="edit"
                    onClick={() => this.setCurrentSeller(seller)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={seller.username}
                  description={`${seller.firstName} ${seller.lastName}`}
                />
              </List.Item>
            )}
          />
          {currentSeller && (
            <SellerEditForm
              setCurrentSeller={this.setCurrentSeller}
              currentSeller={currentSeller}
            />
          )}
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(SellerForm);
