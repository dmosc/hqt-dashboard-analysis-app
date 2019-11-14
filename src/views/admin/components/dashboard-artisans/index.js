import React, {Component} from 'react';
import {Card, Icon, Avatar} from 'antd';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';

const {Meta} = Card;

class DashboardArtisans extends Component {
  state = {};
  render() {
    const {collapsed, onCollapse, user} = this.props;
    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Artisans"
        user={user}
      >
        <Container display="flex">
          {[1, 2, 3, 4, 5, 5, 6, 6].map(artisan => (
            <Card
              style={{
                minWidth: 50,
                margin: 10,
                border: 'none',
                boxShadow: '0 0 2rem 0 rgba(136, 152, 170, 0.15)'
              }}
              actions={[
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          ))}
        </Container>
      </Layout>
    );
  }
}

export default DashboardArtisans;
