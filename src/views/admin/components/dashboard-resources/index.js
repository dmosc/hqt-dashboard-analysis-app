import React, {Component} from 'react';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';

class DashboardResources extends Component {
  state = {};
  render() {
    const {collapsed, onCollapse, user} = this.props;
    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Resources"
        user={user}
      >
        <Container display="flex" justifycontent="center" alignitems="center">
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
