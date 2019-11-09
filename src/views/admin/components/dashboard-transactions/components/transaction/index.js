import React from 'react';
import {TransactionCardContainer} from './elements';
import {Card} from 'antd';

const {Meta} = Card;

const TransactionCard = () => {
  return (
    <TransactionCardContainer>
      <Meta
        title="Nombre de la transacción"
        description="Descripción de la transacción"
      />
    </TransactionCardContainer>
  );
};

export default TransactionCard;
