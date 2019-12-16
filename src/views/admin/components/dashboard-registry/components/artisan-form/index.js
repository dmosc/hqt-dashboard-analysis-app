import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Icon, Input, Button, Select} from 'antd';
import {ARTISAN_REGISTER} from './graphql/mutations';
import ListContainer from './components/list';
import EditForm from './components/edit-form';
import {GET_ORIGINS, GET_ARTISANS} from './graphql/queries';

const {Option} = Select;

class ArtisanForm extends Component {
  state = {
    loading: false,
    loadingArtisans: false,
    origins: [],
    artisans: [],
    currentArtisan: null,
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingArtisans: true});

    try {
      const {
        data: {origins},
      } = await client.query({
        query: GET_ORIGINS,
        variables: {filters: {}},
      });

      if (origins) this.setState({origins});

      const {
        data: {artisans},
      } = await client.query({
        query: GET_ARTISANS,
        variables: {filters: {}},
      });

      if (artisans) this.setState({artisans});

      this.setState({loadingArtisans: false, origins});
    } catch (e) {
      this.setState({loadingArtisans: false});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});

    e.preventDefault();
    form.validateFields(
      async (err, {firstName, lastName, username, email, password, origin}) => {
        if (!err) {
          try {
            await client.mutate({
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

            form.resetFields();
            window.location.reload();
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

  setCurrentArtisan = currentArtisan => this.setState({currentArtisan});

  render() {
    const {form} = this.props;
    const {
      loading,
      loadingArtisans,
      origins,
      artisans,
      currentArtisan,
    } = this.state;

    const ArtisanEditForm = Form.create({name: 'artisanEdit'})(EditForm);
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {form.getFieldDecorator('firstName', {
              rules: [{required: true, message: 'Please input your name(s)!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="First name(s)"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('lastName', {
              rules: [
                {required: true, message: 'Please input your last name(s)!'},
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Last name(s)"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Username"
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
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('origin', {
              rules: [{required: true, message: 'Please select an Origin!'}],
            })(
              <Select placeholder="Origin">
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
              {(loading && 'Espere..') || 'Guardar'}
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
              <List.Item
                actions={[
                  <Icon
                    type="edit"
                    onClick={() => this.setCurrentArtisan(artisan)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={`${artisan.lastName}, ${artisan.firstName}`}
                  description={`${artisan.origin.code}`}
                />
              </List.Item>
            )}
          />
          {currentArtisan && (
            <ArtisanEditForm
              setCurrentArtisan={this.setCurrentArtisan}
              currentArtisan={currentArtisan}
              origins={origins}
            />
          )}
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(ArtisanForm);
