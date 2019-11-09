import styled from 'styled-components';
import {Breadcrumb} from 'antd';

const {Item} = Breadcrumb;

const BreadCrumbContainer = styled(Breadcrumb)`
  margin: 16px;
`;

const BreadcrumbItem = styled(Item)`
  :hover {
    cursor: pointer;
  }
`;

export {BreadCrumbContainer, BreadcrumbItem};
