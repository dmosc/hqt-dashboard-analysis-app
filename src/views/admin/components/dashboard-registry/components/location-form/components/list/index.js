import React from 'react';
import {TitleList, ContentList} from './elements';

const ListContainer = ({children, title}) => {
  return (
    <React.Fragment>
      {title && <TitleList>{title}</TitleList>}
      <ContentList>{children}</ContentList>
    </React.Fragment>
  );
};

export default ListContainer;
