import styled from 'styled-components';

const ColumnContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`;

const TaskList = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: flex-start;
  max-height: 60vh;
  min-height: 60vh;
  width: 100%;
  padding: 20px;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  opacity: ${props => (props.isDraggingOver ? '0.7' : '1')};
  transition: opacity 0.2s ease;
`;

const ColumnTitle = styled.p`
  font-size: 1.2vw;
  margin: 0px;
  border-bottom: 1px solid grey;
  width: 100%;

  :hover {
    border-bottom: 1px solid #1890ff;
    color: #1890ff;
    cursor: context-menu;
  }
`;

export {ColumnContainer, TaskList, ColumnTitle};
