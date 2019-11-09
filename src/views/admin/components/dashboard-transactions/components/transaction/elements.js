import styled from 'styled-components';
import {Card} from 'antd';

const TransactionCardContainer = styled(Card)`
  background-color: #fdfdff;
  color: ${props => (props.isDragging ? '#ffffff' : null)};
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin: 10px 0px;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
`;

export {TransactionCardContainer};
