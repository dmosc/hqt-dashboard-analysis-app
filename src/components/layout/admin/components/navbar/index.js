import React from 'react';
import {withRouter} from 'react-router-dom';
import {Icon, PageHeader} from 'antd';
import {NavbarContainer, MenuContainer} from './elements';
import {MenuItem} from 'components/common/menu/elements';

const NavBar = props => {
  const {page, history} = props;
  return (
    <NavbarContainer>
      <MenuContainer mode="horizontal">
        <MenuItem key="1">
          <Icon type="user" />
          <span>Test user</span>
        </MenuItem>
      </MenuContainer>
      <PageHeader
        style={{
          margin: 0,
          padding: '10px 20px'
        }}
        onBack={() => history.goBack()}
        title={page}
      />
    </NavbarContainer>
  );
};

export default withRouter(NavBar);
