import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Icon, Input, Button, InputNumber} from 'antd';
import ListContainer from './components/list';
import {ORIGIN_REGISTER} from './graphql/mutations';
import {GET_ORIGINS} from './graphql/queries';

class OriginForm extends Component {
  state = {
    loading: false,
    loadingOrigins: false,
    origins: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingOrigins: true});

    try {
      const {
        data: {origins},
      } = await client.query({
        query: GET_ORIGINS,
        variables: {
          filters: {},
        },
      });

      if (!origins) throw new Error('No origins found');

      this.setState({origins, loadingOrigins: false});
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {municipality, community, group}) => {
      if (!err) {
        try {
          const {
            data: {origin},
          } = await client.mutate({
            mutation: ORIGIN_REGISTER,
            variables: {
              origin: {municipality, community, group},
            },
          });

          this.setState({loading: false});
          toast(`New code registered: ${origin.code}`, {
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
    });
  };

  render() {
    const {form} = this.props;
    const {loading, loadingOrigins, origins} = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="origin-form">
          <Form.Item>
            {form.getFieldDecorator('municipality', {
              rules: [{required: true, message: 'El municipio es requerido!'}],
            })(
              <Input
                prefix={
                  <Icon type="cloud" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Municipio"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('community', {
              rules: [{required: true, message: 'Escriba la comunidad!'}],
            })(
              <Input
                prefix={<Icon type="team" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Comunidad"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('group', {
              rules: [{required: true, message: 'Ingrese el número de grupo!'}],
            })(
              <InputNumber
                prefix={
                  <Icon type="number" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Grupo"
                min={0}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="origin-form-button"
              icon="save"
              loading={loading}
            >
              {(loading && 'Espere..') || 'Guardar'}
            </Button>
          </Form.Item>
        </Form>
        <ListContainer title="Orígenes registrados">
          <List
            loading={loadingOrigins}
            itemLayout="horizontal"
            dataSource={origins}
            size="small"
            renderItem={origin => (
              <List.Item actions={[<Icon type="edit" />]}>
                <List.Item.Meta
                  title={origin.code}
                  description={`${origin.municipality}, ${origin.community}, ${origin.group}`}
                />
              </List.Item>
            )}
          />
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(OriginForm);
