import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, List, Icon, Input, Button, InputNumber} from 'antd';
import ListContainer from './components/list';
import EditForm from './components/edit-form';
import {ORIGIN_REGISTER} from './graphql/mutations';
import {GET_ORIGINS} from './graphql/queries';

class OriginForm extends Component {
  state = {
    loading: false,
    loadingOrigins: false,
    origins: [],
    currentOrigin: null,
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
      this.setState({loadingOrigins: false});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;
    const {origins: oldOrigins} = this.state;

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

          toast(`New code registered: ${origin.code}`, {
            duration: 3000,
            closeable: true,
          });

          const origins = [...oldOrigins];
          origins.unshift(origin);

          this.setState({loading: false, origins});

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

  setCurrentOrigin = currentOrigin => this.setState({currentOrigin});

  render() {
    const {form} = this.props;
    const {loading, loadingOrigins, origins, currentOrigin} = this.state;

    const OriginEditForm = Form.create({name: 'originEdit'})(EditForm);

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('municipality', {
              rules: [{required: true, message: 'Municipality is required!'}],
            })(
              <Input
                prefix={
                  <Icon type="cloud" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Municipality"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('community', {
              rules: [{required: true, message: 'Community is required!'}],
            })(
              <Input
                prefix={<Icon type="team" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Community"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('group', {
              rules: [{required: true, message: 'Group number is required!'}],
            })(
              <InputNumber
                prefix={
                  <Icon type="number" style={{color: 'rgba(0,0,0,.25)'}} />
                }
                placeholder="Group"
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
              <List.Item
                actions={[
                  <Icon
                    type="edit"
                    onClick={() => this.setCurrentOrigin(origin)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={origin.code}
                  description={`${origin.municipality}, ${origin.community}, ${origin.group}`}
                />
              </List.Item>
            )}
          />
          {currentOrigin && (
            <OriginEditForm
              setCurrentOrigin={this.setCurrentOrigin}
              currentOrigin={currentOrigin}
            />
          )}
        </ListContainer>
      </React.Fragment>
    );
  }
}

export default withApollo(OriginForm);
