import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Row, Col, Icon, Typography} from 'antd';
import RadarChart from 'components/common/charts/radar-chart/index';


const {Title} = Typography; 


class Topsell extends Component {
    state = {
        loading: false,
        total: 0,
        top: "",
        low: "",
        records: [],
    };

    render() {
        const {loading, total, top, low, records} = this.props; 
        return (
            <div> 
                {(loading && <Icon type = "loading"/>) || (
                    <Row type = "flex" justify = "space-around" align = "middle">
                        <Col span={12}>
                <Title copyable level={4}>{`Total: ${total}`}</Title>
                <Title copyable level={4}>{`Más vendido: ${top}`}</Title>
                <Title copyable level={4}>{`Menos vendido: ${low}`}</Title>
                        </Col>
                        <Col span={12}>
                            {(Array.isArray(records) && records.length === 0 && (
                                <div> No existen suficientes datos</div>
                            )) || <RadarChart data= {records} />}
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}

export default withApollo(Topsell);