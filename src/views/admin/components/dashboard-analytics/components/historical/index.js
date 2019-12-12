import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Row, Col, Icon, Typography} from 'antd';
import BarChart from 'components/common/charts/bar-chart/index';
import {GET_DAY_RESULTS} from './graphql/queries';

const {Title} = Typography;

class Historical extends Component {
    state = {
        loading: false, 
        total: 0, 
        results: [],
    };

    render() {
        const {loading, total, results} = this.props;
    
        return (
          <div>
            {(loading && <Icon type="loading" />) || (
              <Row type="flex" justify="space-around" align="middle">
                <Col span={12}>
                  <Title copyable level={4}>{`Total: ${total}`}</Title>
                </Col>
                <Col span={12}>
                {(Array.isArray(records) && records.length === 0 && (
                                <div> No existen suficientes datos</div>
                )) || <BarChart data= {results} />}
                </Col>
              </Row>
            )}
          </div>
        );
      }

}

export default withApollo(Historical);