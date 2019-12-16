import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import debounce from 'debounce';
import toast from 'toast-me';
import {Modal, Select, Form} from 'antd';
import {REGISTER_PRODUCT_LOCATION} from './graphql/mutations';

const {Option} = Select;

class RegisterForm extends Component {
  state = {
    search: '',
    loading: false,
    sellers: [],
  };

  handleSubmit = e => {
    const {form, currentProductId: id, client} = this.props;

    e.preventDefault();
    form.validateFields(async (err, {location}) => {
      if (!err) {
        try {
          const {
            data: {receive: product},
          } = await client.mutate({
            mutation: REGISTER_PRODUCT_LOCATION,
            variables: {
              product: {id, location},
            },
          });

          toast(`Product ${product.code} has been modified succesfully!`, {
            duration: 3000,
            closeable: true,
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

  render() {
    const {form, visible, locations} = this.props;

    return (
      <Modal
        title="Register form"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item>
            {form.getFieldDecorator('location')(
              <Select placeholder="Location">
                {locations.map(({id, name}, i) => (
                  <Option key={i} value={id}>
                    {`${name}`}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withApollo(RegisterForm);
