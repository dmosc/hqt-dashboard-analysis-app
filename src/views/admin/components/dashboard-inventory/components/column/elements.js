import styled from 'styled-components';

const ColumnContainer = styled.div`
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
  max-width: 40vh;
  min-width: 40vh;
  padding: 10px 10px 10px 0px;

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
  font-size: 20px;
  margin: 0px;
  border-bottom: 1px solid grey;
  width: 100%;

  :hover {
    border-bottom: 1px solid #614ad3;
    color: #614ad3;
  }
`;

export {ColumnContainer, TaskList, ColumnTitle};
