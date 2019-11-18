import styled from 'styled-components';
import {Layout as Layer} from 'antd';

const {Content} = Layer;

const ContentContainer = styled(Content)`
  margin: 30px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  background-color: #ffffff;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  display: ${props => (props.display ? props.display : null)}
  justify-content: ${props =>
    props.justifycontent ? props.justifycontent : null}
  align-items: ${props => (props.alignitems ? props.alignitems : null)}
  flex-wrap: wrap;
  width: ${props => (props.width ? props.width : 'fit-content')}
  height: ${props => (props.height ? props.height : 'fit-content')}

  :hover {
    box-shadow: 0 0 3rem 0 rgba(136, 152, 170, 0.2);
  }
`;

const TitleContainer = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
`;

export {ContentContainer, TitleContainer};
