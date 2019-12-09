import styled from 'styled-components';
import {Card} from 'antd';

const TransactionCardContainer = styled(Card)`
  background-color: #fdfdff;
  color: ${props => (props.isDragging ? '#ffffff' : null)};
  font-size: 0.6;
  border-radius: 5px;
  border: none;
  margin: 10px 0px;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
`;

const Amount = styled.div`
  padding: 0px;
  color: ${props => (props.type === 'IN' ? 'green' : 'red')};
  font-weight: bold;
  font-size: 1.1rem;
`;
const Payment = styled.div`
  padding: 0px;
  color: black;
  font-weight: 400;
  font-size: 0.7rem;
`;

export {TransactionCardContainer, Amount, Payment};
