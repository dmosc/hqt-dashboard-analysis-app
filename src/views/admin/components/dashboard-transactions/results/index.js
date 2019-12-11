import React from 'react';
import {Row, Col, Icon, Typography} from 'antd';
import PieChart from 'components/common/charts/pie-chart';

const {Title} = Typography;

const Results = ({loading, total, ins, outs}) => {
  return (
    <div>
      {(loading && <Icon type="loading" />) || (
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Title copyable level={4}>{`Total: ${total}`}</Title>
            <Title copyable level={4}>{`Transacciones: ${ins + outs}`}</Title>
          </Col>
          <Col span={12}>
            {(ins === 0 && outs === 0 && (
              <div>No hay suficientes datos</div>
            )) || <PieChart data={{ins, outs}} />}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Results;
