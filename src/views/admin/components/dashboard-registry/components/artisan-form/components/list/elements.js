import styled from 'styled-components';

const ContentList = styled.div`
  max-height: 20vh;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TitleList = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
`;

export {ContentList, TitleList};
