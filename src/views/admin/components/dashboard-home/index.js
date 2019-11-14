import React, {Component} from 'react';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';

class DashboardHome extends Component {
  state = {};
  render() {
    const {user, collapsed, onCollapse} = this.props;
    return (
      <Layout
        user={user}
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Home"
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

export default DashboardHome;
