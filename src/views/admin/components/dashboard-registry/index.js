import React, {Component} from 'react';
import {Form} from 'antd';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import OriginForm from './components/origin-form';
import LocationForm from './components/location-form';
import ArtisanForm from './components/artisan-form';

class DashboardRegistry extends Component {
  render() {
    const {user, collapsed, onCollapse} = this.props;
    const OriginRegisterForm = Form.create({name: 'origin'})(OriginForm);
    const LocationRegisterForm = Form.create({name: 'location'})(LocationForm);
    const ArtisanRegisterForm = Form.create({name: 'location'})(ArtisanForm);

    return (
      <Layout
        user={user}
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Registry"
      >
        <Container title="Origin" alignitems="center">
          <OriginRegisterForm />
        </Container>
        <Container title="Location" alignitems="center">
          <LocationRegisterForm />
        </Container>
        <Container title="Artisan" alignitems="center">
          <ArtisanRegisterForm />
        </Container>
      </Layout>
    );
  }
}

export default DashboardRegistry;
