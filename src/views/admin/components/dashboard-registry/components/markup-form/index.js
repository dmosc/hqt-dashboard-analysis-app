import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Row, Col, InputNumber, Button, Icon, Typography} from 'antd';
import {GET_MARKUPS} from './graphql/queries';
import {MARKUP_EDIT} from './graphql/mutations';

const {Text} = Typography;

class MarkupForm extends Component {
  state = {
    loading: false,
    loadingMarkups: false,
    markups: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loadingMarkups: true});

    try {
      const {
        data: {markups},
      } = await client.query({
        query: GET_MARKUPS,
        variables: {
          filters: {},
        },
      });

      if (!markups) throw new Error('No markups found');

      this.setState({markups, loadingMarkups: false});
    } catch (e) {
      this.setState({loadingMarkups: false});
    }
  };

  handleSubmit = e => {
    const {form, client} = this.props;

    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const keys = Object.keys(values);
        for (let i = 0; i < keys.length; i += 3) {
          const id = keys[i].substring(keys[i].indexOf(':') + 1);
          const low = values[keys[i]];
          const high = values[keys[i + 1]];
          const markup = values[keys[i + 2]];

          try {
            await client.mutate({
              mutation: MARKUP_EDIT,
              variables: {markup: {id, low, high, markup}},
            });
          } catch (e) {
            e['graphQLErrors'].map(({message}) =>
              toast(message, 'error', {duration: 3000, closeable: true})
            );
          }
        }

        window.location.reload();
      } else {
        this.setState({loading: false});
      }
    });
  };

  render() {
    const {form} = this.props;
    const {loading, loadingMarkups, markups} = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {(!loadingMarkups &&
          markups.map(({id, low, high, markup}) => (
            <Row type="flex" justify="start">
              <Col span={7}>
                <Form.Item>
                  <Text disabled>low</Text>
                  {form.getFieldDecorator(`low:${id}`, {initialValue: low})(
                    <InputNumber
                      prefix={
                        <Icon type="down" style={{color: 'rgba(0,0,0,.25)'}} />
                      }
                      style={{width: '70px'}}
                      placeholder="Mínimo"
                      min={0}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item>
                  <Text disabled>high</Text>
                  {form.getFieldDecorator(`high:${id}`, {initialValue: high})(
                    <InputNumber
                      prefix={
                        <Icon type="up" style={{color: 'rgba(0,0,0,.25)'}} />
                      }
                      style={{width: '70px'}}
                      placeholder="Máximo"
                      min={0}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col style={{marginLeft: 20}} span={7}>
                <Form.Item>
                  <Text disabled>markup</Text>
                  {form.getFieldDecorator(`markup:${id}`, {
                    initialValue: markup,
                  })(
                    <InputNumber
                      prefix={
                        <Icon type="cash" style={{color: 'rgba(0,0,0,.25)'}} />
                      }
                      style={{width: '70px'}}
                      placeholder="Markup"
                      min={0}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          ))) || <div>Cargando markups...</div>}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon="save"
            loading={loading}
          >
            {(loading && 'Espere..') || 'Guardar'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withApollo(MarkupForm);
