import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Row, Col, Icon, Typography} from 'antd';
import PieChart from 'components/common/charts/pie-chart/index';
import {GET_DAY_RESULTS} from './graphql/queries';

const {Title} = Typography;

class Results extends Component {
  state = {
    loading: false,
    total: 0,
    ins: 0,
    outs: 0,
  };

  render() {
    const {loading, total, ins, outs} = this.props;

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
  }
}

export default withApollo(Results);
