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
        <MenuItem onClick={() => window.location.reload()} key="2">
          <Icon type="reload" />
          <span>Actualizar</span>
        </MenuItem>
        <MenuItem key="3" onClick={handleLogout}>
          <Icon type="logout" />
          <span>Salir</span>
        </MenuItem>
      </Menu>
      <PageHeader
        style={{
          margin: 0,
          padding: '10px 20px',
        }}
        onBack={() => history.goBack()}
        title={page}
      />
    </NavbarContainer>
  );
};

export default withRouter(NavBar);
