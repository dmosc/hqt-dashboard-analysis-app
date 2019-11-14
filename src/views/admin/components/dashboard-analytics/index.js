import React, {Component} from 'react';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import PieChart from 'components/common/charts/pie-chart';
import BarChart from 'components/common/charts/bar-chart';
import AreaChart from 'components/common/charts/area-chart';
import RadarChart from 'components/common/charts/radar-chart';
import {Row, Col} from 'antd';

class DashboardAnalytics extends Component {
  state = {};
  render() {
    const {collapsed, onCollapse, user} = this.props;
    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Data Analytics"
        user={user}
      >
        <Row>
          <Col span={12}>
            <Container>
              <RadarChart />
            </Container>
            <Container>
              <PieChart />
            </Container>
          </Col>
          <Col span={12}>
            <Container>
              <BarChart />
            </Container>
            <Container>
              <AreaChart />
            </Container>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default DashboardAnalytics;
