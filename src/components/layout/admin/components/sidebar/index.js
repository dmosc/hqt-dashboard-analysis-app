import React from 'react';
import {Layout as Layer} from 'antd';
import Menu from 'components/common/menu';

const {Sider} = Layer;

const Sidebar = ({collapsed, onCollapse}) => {
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu
        items={[
          {icon: 'home', title: 'Home'},
          {icon: 'cloud-upload', title: 'Registry'},
          {icon: 'unordered-list', title: 'Inventory'},
          {icon: 'dollar', title: 'Transactions'},
          {icon: 'pie-chart', title: 'Data analytics'},
          {icon: 'team', title: 'Artisans'},
          {icon: 'calendar', title: 'Events'},
          {icon: 'folder', title: 'Resources'},
        ]}
        mode="inline"
      />
    </Sider>
  );
};

export default Sidebar;
