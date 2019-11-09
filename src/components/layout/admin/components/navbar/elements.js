import styled from 'styled-components';
import {Layout, Menu} from 'antd';

const {Header} = Layout;

const NavbarContainer = styled(Header)`
  background: none;
  padding: 0px;
  margin-bottom: 35px;
`;

const MenuContainer = styled(Menu)`
  display: flex;
  jusfity-content: flex-end;
`;
export {NavbarContainer, MenuContainer};
