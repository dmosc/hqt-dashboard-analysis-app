import React from 'react';
import {withRouter} from 'react-router-dom';
import {BreadCrumbContainer, BreadcrumbItem} from './elements';

const BreadCrumb = props => {
  return (
    <BreadCrumbContainer>
      <BreadcrumbItem>Item 1</BreadcrumbItem>
      <BreadcrumbItem>Item 2</BreadcrumbItem>
      <BreadcrumbItem>Item 2</BreadcrumbItem>
    </BreadCrumbContainer>
  );
};

export default withRouter(BreadCrumb);
