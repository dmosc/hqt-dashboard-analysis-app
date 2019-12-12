import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Icon, Input, Button, Select} from 'antd';
import {ARTISAN_REGISTER} from './graphql/mutations';
import ListContainer from './components/list/index';
import {GET_ORIGINS, GET_ARTISANS} from './graphql/queries';

const {Option} = Select;

class ArtisanForm extends Component {
  state = {
    loading: false,
    loadingArtisans: false,
    origins: [],
    artisans: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingArtisans: true});

    try {
      const [
        {
          data: {origins},
        },
        {
          data: {artisans},
        },
      ] = await Promise.all([
        client.query({
          query: GET_ORIGINS,
          variables: {filters: {}},
        }),
        client.query({
          query: GET_ARTISANS,
          variables: {filters: {}},
        }),
      ]);

      this.setState({loadingArtisans: false, origins, artisans});
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});

    e.preventDefault();
    form.validateFields(
      async (err, {firstName, lastName, username, email, password, origin}) => {
        console.log(email, password);
        if (!err) {
          try {
            const {
              data: {artisan},
            } = await client.mutate({
              mutation: ARTISAN_REGISTER,
              variables: {
                artisan: {
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                  origin,
                },
              },
            });

            this.setState({loading: false});
            toast(`Artesano registrado con clave: ${artisan.code}`, {
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
          toast(err, 'error', {duration: 3000, closeable: true});
          this.setState({loading: false});
        }
      }
    );
  };

  render() {
    const {form} = this.props;
    const {loading, loadingArtisans, origins, artisans} = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {form.getFieldDecorator('firstName', {
              rules: [{required: true, message: 'Favor de ingresar los nombre(s)!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre(s)"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('lastName', {
              rules: [
                {required: true, message: 'Favor de ingresar los apellido(s)!'},
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Apellido(s)"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('username', {
              rules: [{required: true, message: 'Favor de ingresar el usuario!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Usuario"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('email')(
              <Input
                prefix={
                  <Icon type="email" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password')(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                type="password"
                placeholder="Contraseña"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('origin', {
              rules: [{required: true, message: 'Favor de seleccionar un origen!'}],
            })(
              <Select placeholder="Origen">
                {origins.map(
                  ({municipality, community, group, code, id}, i) => (
                    <Option key={i} value={id}>
                      {`${code} (${municipality}, ${community}, ${group})`}
                    </Option>
                  )
                )}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="artisan-form-button"
              icon="save"
              loading={loading}
            >
              {(loading && 'Espere...') || 'Guardar'}
            </Button>
          </Form.Item>
        </Form>
        <ListContainer title="Artesanas registradas">
          <List
            loading={loadingArtisans}
            itemLayout="horizontal"
            dataSource={artisans}
            size="small"
            renderItem={artisan => (
              <List.Item actions={[<Icon type="edit" />]}>
                <List.Item.Meta
                  title={`${artisan.lastName}, ${artisan.firstName}`}
                  description={`${artisan.origin.code}`}
                />
              </List.Item>
            )}
          />
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(ArtisanForm);
