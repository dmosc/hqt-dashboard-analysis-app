import React, {Component} from 'react';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import SalesTable from './components/sales-table/index';

class DashboardSales extends Component {
  state = {};
  render() {
    const {collapsed, onCollapse, user} = this.props;
    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Sales"
        user={user}
      >
        <Container title="Tabla de distribución de ingresos">
          <SalesTable />
        </Container>
      </Layout>
    );
  }
}

export default DashboardSales;
