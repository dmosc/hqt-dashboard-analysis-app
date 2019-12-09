import React from 'react';
import {TransactionCardContainer, Amount, Payment} from './elements';
import {Row, Col, Card} from 'antd';
import moment from 'moment';

const {Meta} = Card;

const TransactionCard = ({
  transaction: {type, paymentMethod, name, description, amount, date},
}) => {
  return (
    <TransactionCardContainer>
      <Row>
        <Col span={21}>
          <Meta title={name} description={description} />
        </Col>
        <Col span={2}>
          <Amount type={type}>{`$${amount}`}</Amount>
          <Payment>{paymentMethod}</Payment>
        </Col>
      </Row>
      <Row style={{color: 'rgba(0, 0, 0, 0.45)'}}>
        {moment(date).format('MMMM DD YYYY')}
      </Row>
    </TransactionCardContainer>
  );
};

export default TransactionCard;
