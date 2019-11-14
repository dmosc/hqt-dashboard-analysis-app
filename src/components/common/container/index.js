import React from 'react';
import {ContentContainer} from './elements';

const Container = ({
  children,
  width,
  height,
  display,
  justifycontent,
  alignitems
}) => {
  return (
    <ContentContainer
      width={width}
      height={height}
      display={display}
      justifycontent={justifycontent}
      alignitems={alignitems}
    >
      {children}
    </ContentContainer>
  );
};

export default Container;
