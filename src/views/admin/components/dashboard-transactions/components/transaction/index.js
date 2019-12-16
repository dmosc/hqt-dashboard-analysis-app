import React from 'react';
import {TransactionCardContainer, Amount, Payment} from './elements';
import {Row, Col, Card, Icon} from 'antd';
import moment from 'moment';

const {Meta} = Card;

const TransactionCard = ({transaction, setCurrentTransaction}) => {
  return (
    <TransactionCardContainer>
      <Row>
        <Col span={20}>
          <Meta
            title={transaction.name}
            description={transaction.description}
          />
        </Col>
        <Col span={4}>
          <Amount type={transaction.type}>{`$${transaction.amount}`}</Amount>
          <Payment>{transaction.paymentMethod}</Payment>
        </Col>
      </Row>
      <Row style={{color: 'rgba(0, 0, 0, 0.45)'}}>
        <Col span={20}>{moment(transaction.date).format('MMMM DD YYYY')}</Col>
        <Col span={4}>
          {!transaction.product && (
            <Icon
              style={{marginTop: 5}}
              type="edit"
              onClick={() => setCurrentTransaction(transaction)}
            />
          )}
        </Col>
      </Row>
    </TransactionCardContainer>
  );
};

export default TransactionCard;
