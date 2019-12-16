import styled from 'styled-components';
import {Col} from 'antd';

const TaskContainer = styled.div`
  background-color: ${props => (props.isDragging ? '#1890ff' : '#fdfdff')};
  color: ${props => (props.isDragging ? '#ffffff' : null)};
  font-size: 0.4vw;
  font-weight: bold;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
  width: inherit;
  max-width: inherit;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
`;

const Column = styled(Col)``;

const Amount = styled.span`
  padding: 0px;
  color: ${props => (props.isDragging ? '#ffffff' : '#52c41a')};
  font-weight: bold;
`;

const Date = styled.span`
  margin: 0px 5px;
  padding: 0px;
  color: ${props => (props.isDragging ? '#ffffff' : '#1890ff')};
  font-weight: bold;
`;

const Seller = styled.span`
  margin: 0px;
  padding: 0px;
  color: ${props => (props.isDragging ? '#ffffff' : '#fa8c16')};
  font-weight: bold;
`;

export {TaskContainer, Column, Amount, Date, Seller};
