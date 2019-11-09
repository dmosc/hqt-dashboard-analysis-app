import React from 'react';
import {ContentContainer} from './elements';

const Container = ({children, width, height, display}) => {
  return (
    <ContentContainer width={width} height={height} display={display}>
      {children}
    </ContentContainer>
  );
};

export default Container;
