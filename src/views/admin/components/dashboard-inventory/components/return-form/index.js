import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import debounce from 'debounce';
import toast from 'toast-me';
import {Modal} from 'antd';
import {RETURN_PRODUCT} from './graphql/mutations';

class ReturnForm extends Component {
  state = {
    loading: false,
  };

  handleSubmit = e => {
    const {form, currentProductId: id, client} = this.props;

    e.preventDefault();
    form.validateFields(async err => {
      if (!err) {
        try {
          const {
            data: {return: product},
          } = await client.mutate({
            mutation: RETURN_PRODUCT,
            variables: {
              product: {id},
            },
          });

          toast(
            `El producto: ${product.code} ha sido actualizado exitosamente!`,
            {
              duration: 3000,
              closeable: true,
            }
          );

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
    const {visible} = this.props;

    return (
      <React.Fragment>
        <Modal
          title="Forma de retorno"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          ¿Está seguro que desea retornar el producto?
        </Modal>
      </React.Fragment>
    );
  }
}

export default withApollo(ReturnForm);
