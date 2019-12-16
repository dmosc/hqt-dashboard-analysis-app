import React from 'react';
import moment from 'moment';
import {Draggable} from 'react-beautiful-dnd';
import {Row, Col} from 'antd';
import {TaskContainer, Amount, Date, Seller} from './elements';

const Task = ({task: {id, product}, index}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {product && (
            <React.Fragment>
              <Row type="flex" justify="space-between">
                <Col span={18}>{product.productName}</Col>
                <Col span={6}>
                  <Amount
                    isDragging={snapshot.isDragging}
                  >{`$${product.retailPrice}`}</Amount>
                </Col>
              </Row>
              <Row>{product.code}</Row>
              {product.dateReceived && (
                <Row>
                  IN:
                  <Date>
                    {moment(product.dateReceived).format('YYYY MM DD')}
                  </Date>
                </Row>
              )}
              {product.dateSold && (
                <Row>
                  OUT:
                  <Date>{moment(product.dateSold).format('YYYY MM DD')}</Date>
                </Row>
              )}
              {product.location && <Row>{product.location.name}</Row>}
              {product.seller && (
                <Row>
                  <Seller
                    isDragging={snapshot.isDragging}
                  >{`${product.seller.firstName} ${product.seller.lastName}`}</Seller>
                </Row>
              )}
            </React.Fragment>
          )}
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
