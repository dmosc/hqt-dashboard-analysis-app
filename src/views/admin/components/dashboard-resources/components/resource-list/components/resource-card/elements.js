import styled from 'styled-components';
import {Card} from 'antd';

const ResourceCardContainer = styled(Card)`
  background-color: #fdfdff;
  color: #ffffff;
  font-size: 0.6;
  border-radius: 5px;
  border: none;
  margin: 10px 0px;
  width: 100%;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export {ResourceCardContainer, ButtonsContainer};
