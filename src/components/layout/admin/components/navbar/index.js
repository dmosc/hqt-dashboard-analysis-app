import React from 'react';
import {withRouter} from 'react-router-dom';
import {Icon, PageHeader, Menu} from 'antd';
import cookie from 'react-cookies';
import {NavbarContainer} from './elements';
import {MenuItem} from 'components/common/menu/elements';

const handleLogout = () => {
  cookie.remove('token', {path: '/'});
  window.location.reload();
};

const NavBar = props => {
  const {page, history, user} = props;
  return (
    <NavbarContainer>
      <Menu
        mode="horizontal"
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        <MenuItem key="1" disabled={true}>
          <Icon type="user" />
          <span>{user.firstName}</span>
        </MenuItem>
        <MenuItem key="2" onClick={handleLogout}>
          <Icon type="logout" />
          <span>Logout</span>
        </MenuItem>
      </Menu>
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
