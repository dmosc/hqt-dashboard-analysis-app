import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Form} from 'antd';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import ResourceForm from './components/resource-form';
import ResourceList from './components/resource-list/index';

class DashboardResources extends Component {
  render() {
    const {collapsed, onCollapse, user} = this.props;

    const ResourceRegisterForm = Form.create({name: 'origin'})(ResourceForm);

    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Resources"
        user={user}
      >
        <Container title="Registrar nuevo recurso" alignitems="center">
          <ResourceRegisterForm user={user} />
        </Container>
        <Container title="Recursos" height="80vh" alignitems="center">
          <ResourceList />
        </Container>
      </Layout>
    );
  }
}

export default withApollo(DashboardResources);
