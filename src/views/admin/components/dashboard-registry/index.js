import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Form, Row, Col} from 'antd';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import OriginForm from './components/origin-form';
import LocationForm from './components/location-form';
import ArtisanForm from './components/artisan-form';
import ProductTypeForm from './components/productType-form';

class DashboardRegistry extends Component {
  render() {
    const {user, collapsed, onCollapse} = this.props;
    const OriginRegisterForm = Form.create({name: 'origin'})(OriginForm);
    const LocationRegisterForm = Form.create({name: 'location'})(LocationForm);
    const ArtisanRegisterForm = Form.create({name: 'location'})(ArtisanForm);
    const ProductTypeRegisterForm = Form.create({name: 'productType'})(
      ProductTypeForm
    );

    return (
      <Layout
        user={user}
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Registro"
      >
        <Row>
          <Col span={6}>
            <Container title="Orígenes" alignitems="center">
              <OriginRegisterForm />
            </Container>
          </Col>
          <Col span={6}>
            <Container title="Ubicaciones" alignitems="center">
              <LocationRegisterForm />
            </Container>
          </Col>
          <Col span={6}>
            <Container title="Artesanas" alignitems="center">
              <ArtisanRegisterForm />
            </Container>
          </Col>
          <Col span={6}>
            <Container title="Productos" alignitems="center">
              <ProductTypeRegisterForm />
            </Container>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default withApollo(DashboardRegistry);
