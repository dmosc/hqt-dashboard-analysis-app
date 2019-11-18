import React from 'react';
import {ContentContainer, TitleContainer} from './elements';

const Container = ({
  children,
  title,
  width,
  height,
  display,
  justifycontent,
  alignitems,
}) => {
  return (
    <ContentContainer
      width={width}
      height={height}
      display={display}
      justifycontent={justifycontent}
      alignitems={alignitems}
    >
      {title && <TitleContainer>{title}</TitleContainer>}
      {children}
    </ContentContainer>
  );
};

export default Container;
