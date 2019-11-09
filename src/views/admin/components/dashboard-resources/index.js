import React, {Component} from 'react';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';

class DashboardResources extends Component {
  state = {};
  render() {
    console.log(process.env.PUBLIC_URL);
    const {collapsed, onCollapse} = this.props;
    return (
      <Layout collapsed={collapsed} onCollapse={onCollapse} page="Resources">
        <Container display="flex" justifyContent="center" alignItems="center">
          <img
            src="/static/images/section_under_construction.png"
            alt="Under Construction!"
          />
          <h1 style={{fontSize: 40}}>Section under construction...</h1>
        </Container>
      </Layout>
    );
  }
}

export default DashboardResources;
