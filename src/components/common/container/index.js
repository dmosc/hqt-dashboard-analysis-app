import React from 'react';
import {ContentContainer} from './elements';

const Container = ({
  children,
  width,
  height,
  display,
  justifyContent,
  alignItems
}) => {
  return (
    <ContentContainer
      width={width}
      height={height}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </ContentContainer>
  );
};

export default Container;
