import React, {Component} from 'react';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import TransactionCard from './components/transaction';
import {Row, Col} from 'antd';

class DashboardTransactions extends Component {
  state = {};
  render() {
    const {collapsed, onCollapse, user} = this.props;
    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Transactions"
        user={user}
      >
        <Row gutter={{xs: 8, sm: 16, md: 24}} style={{width: '97%'}}>
          <Col span={12}>
            <Container width="100%">Resultados del día!</Container>
            <Container width="100%">Registrar transacción</Container>
          </Col>
          <Col span={12}>
            <Container height="80vh" width="100%">
              {[1, 2, 4, 5, 1, 1, 1].map(card => (
                <TransactionCard />
              ))}
            </Container>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default DashboardTransactions;
