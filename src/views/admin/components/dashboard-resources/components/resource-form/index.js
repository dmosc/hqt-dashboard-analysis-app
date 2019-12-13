import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Icon, Input, Upload, Button} from 'antd';
import {UPLOAD_FILE, REGISTER_RESOURCE} from './graphql/mutations';

class ResourceForm extends Component {
  state = {
    loading: false,
    file: null,
    linkOrFile: 'file',
  };

  setFile = file => this.setState({file});

  handleLinkOrFile = () => {
    const {form} = this.props;
    const {linkOrFile} = this.state;
    if (linkOrFile === 'file') this.setState({linkOrFile: 'link'});
    else this.setState({linkOrFile: 'file'});

    form.resetFields();
  };

  handleCustomRequest = ({onSuccess}) => setTimeout(() => onSuccess('ok'), 0);

  handleSubmit = async e => {
    const {
      form,
      user: {id},
      client,
    } = this.props;
    const {file} = this.state;

    this.setState({loading: true});
    e.preventDefault();
    form.validateFields(async (err, {name, link}) => {
      if (!err) {
        try {
          if (file) {
            const {
              data: {uploadFile: link},
            } = await client.mutate({
              mutation: UPLOAD_FILE,
              variables: {file, folderKey: 'resources', id},
            });

            await client.mutate({
              mutation: REGISTER_RESOURCE,
              variables: {resource: {name, link}},
            });
          } else {
            await client.mutate({
              mutation: REGISTER_RESOURCE,
              variables: {resource: {name, link}},
            });
          }

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
        this.setState({loading: false});
      }
    });
  };

  render() {
    const {form} = this.props;
    const {loading, linkOrFile} = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('name', {
              rules: [
                {required: true, message: 'Nombre del recurso es requerido!'},
              ],
            })(
              <Input
                prefix={<Icon type="info" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Nombre del recurso"
              />
            )}
          </Form.Item>
          <Form.Item>
            {(linkOrFile === 'file' &&
              form.getFieldDecorator('link', {
                rules: [{required: true, message: 'Un archivo es requerido!'}],
              })(
                <Upload
                  name="file"
                  customRequest={this.handleCustomRequest}
                  headers={{authorization: 'authorization-text'}}
                  multiple={false}
                  onChange={({file}) => this.setFile(file)}
                >
                  <Button icon="upload" style={{color: 'rgba(0,0,0,.25)'}}>
                    Subir archivo
                  </Button>
                </Upload>
              )) ||
              form.getFieldDecorator('link', {
                rules: [
                  {
                    required: true,
                    message: 'Un link del recurso es requerido!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="file-text" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Link del recurso"
                />
              )}
            <span
              style={{color: '#1890ff', cursor: 'pointer'}}
              onClick={this.handleLinkOrFile}
            >
              {linkOrFile === 'file' ? 'Subir link' : 'Subir archivo'}
            </span>
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
      </React.Fragment>
    );
  }
}

export default withApollo(ResourceForm);
