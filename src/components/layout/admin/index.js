import React from 'react';
import {Layout as Layer} from 'antd';
import {Sidebar, Navbar, Footer} from './components';
import {Main} from './elements';

const Layout = ({children, collapsed, onCollapse, page, user}) => {
  return (
    <Layer style={{minHeight: '100vh', maxHeight: '100vh'}}>
      <Sidebar collapsed={collapsed} onCollapse={onCollapse} />
      <Layer>
        <Navbar page={page} user={user} />
        <Main>{children}</Main>
        <Footer />
      </Layer>
    </Layer>
  );
};

export default Layout;
