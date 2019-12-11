import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import debounce from 'debounce';
import toast from 'toast-me';
import {Modal, Select, Form, Radio, DatePicker} from 'antd';
import {GET_SELLER_OPTIONS} from './graphql/queries';
import {REGISTER_SELL_TRANSACTION} from './graphql/mutations';

const {Group, Button} = Radio;
const {Option} = Select;

class SellForm extends Component {
  state = {
    search: '',
    loading: false,
    sellers: [],
  };

  handleSubmit = e => {
    const {form, currentProductId: id, client} = this.props;

    e.preventDefault();
    form.validateFields(async (err, {paymentMethod, seller, dateSold}) => {
      if (!err) {
        try {
          await client.mutate({
            mutation: REGISTER_SELL_TRANSACTION,
            variables: {
              product: {id, paymentMethod, seller: seller[0], dateSold},
            },
          });

          window.location.reload();
        } catch (e) {
          e['graphQLErrors'].map(({message}) =>
            toast(message, 'error', {duration: 3000, closeable: true})
          );
        }
      } else {
        toast(err, 'error', {duration: 3000, closeable: true});
      }
    });
  };

  handleCancel = () => {
    const {showModal, getInventory} = this.props;

    getInventory();
    showModal();
  };

  onSearch = search =>
    this.setState(
      {search, loading: !!search, sellers: []},
      debounce(this.getArtisans(search), 1500)
    );

  getArtisans = async key => {
    const {client} = this.props;
    if (!key) {
      this.setState({
        sellers: [],
      });
      return;
    }

    try {
      const {
        data: {sellers},
      } = await client.query({
        query: GET_SELLER_OPTIONS,
        variables: {
          filters: {limit: 10},
        },
      });

      this.setState({
        sellers,
        loading: false,
      });
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  render() {
    const {form, visible} = this.props;
    const {sellers, loading} = this.state;

    return (
      <React.Fragment>
        <Modal
          title="Sell form"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="Payment Method">
              {form.getFieldDecorator('paymentMethod')(
                <Group>
                  <Button value="CASH">Cash</Button>
                  <Button value="IZETTLE">iZettle</Button>
                  <Button value="CLIP">Clip</Button>
                  <Button value="PAYPAL">Paypal</Button>
                  <Button value="TRANSFER">Transfer</Button>
                  <Button value="OTHER">Other</Button>
                </Group>
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('seller')(
                <Select
                  mode="tags"
                  style={{width: '100%'}}
                  placeholder="Seller"
                  onSearch={this.onSearch}
                  tokenSeparators={[',']}
                  maxTagCount={1}
                  loading={loading}
                  allowClear
                >
                  {sellers.map(({id, firstName, lastName, username}) => (
                    <Option key={id} value={username}>
                      <span>{`${firstName} ${lastName}`}</span>
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('dateSold')(
                <DatePicker placeholder="Date received" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withApollo(SellForm);
