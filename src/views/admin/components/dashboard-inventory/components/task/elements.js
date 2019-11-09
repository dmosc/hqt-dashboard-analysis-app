import styled from 'styled-components';
import {Col} from 'antd';

const TaskContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: ${props => (props.isDragging ? '#614ad3' : '#fdfdff')};
  color: ${props => (props.isDragging ? '#ffffff' : null)};
  font-size: 1rem;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 20px;
  width: inherit;
  max-width: inherit;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
`;

const Column = styled(Col)``;

export {TaskContainer, Column};
