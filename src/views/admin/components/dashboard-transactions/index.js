import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Form, Row, Col, Icon} from 'antd';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import TransactionCard from './components/transaction';
import TransactionForm from './components/transaction-form';
import {GET_TRANSACTIONS, GET_DAY_RESULTS} from './graphql/queries';
import Results from './results/index';

class DashboardTransactions extends Component {
  state = {
    loading: false,
    loadingResults: false,
    transactions: [],
    total: 0,
    ins: 0,
    outs: 0,
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loading: true, loadingResults: true});

    try {
      const [
        {
          data: {transactions},
        },
        {
          data: {
            results: {total, ins, outs},
          },
        },
      ] = await Promise.all([
        client.query({
          query: GET_TRANSACTIONS,
          variables: {filters: {limit: 10}},
        }),
        client.query({
          query: GET_DAY_RESULTS,
          variables: {filters: {days: 1}},
        }),
      ]);

      if (!total || !ins || !outs) this.setState({loadingResults: false});
      if (transactions) this.setState({loading: false});

      this.setState({
        loading: false,
        loadingResults: false,
        transactions,
        total,
        ins,
        outs,
      });
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
      this.setState({loading: false, loadingResults: false});
    }
  };

  handleNewTransaction = transaction => {
    const {
      transactions: oldTransactions,
      total: oldTotal,
      ins: oldIns,
      outs: oldOuts,
    } = this.state;

    const transactions = [...oldTransactions];
    let total = oldTotal;
    let ins = oldIns;
    let outs = oldOuts;

    transactions.unshift(transaction);
    if (transaction.type === 'IN') {
      total += transaction.amount;
      ++ins;
    } else {
      total -= transaction.amount;
      ++outs;
    }

    this.setState({transactions, total, ins, outs});
  };

  render() {
    const {collapsed, onCollapse, user} = this.props;
    const {
      loading,
      loadingResults,
      transactions,
      total,
      ins,
      outs,
    } = this.state;

    const TransactionRegisterForm = Form.create({name: 'origin'})(
      TransactionForm
    );

    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Transactions"
        user={user}
      >
        <Row gutter={{xs: 8, sm: 16, md: 24}} style={{width: '97%'}}>
          <Col span={10}>
            <Container title="Resultados del día" width="100%">
              <Results
                loading={loadingResults}
                total={total}
                ins={ins}
                outs={outs}
              />
            </Container>
            <Container title="Registrar transacción" width="100%">
              <TransactionRegisterForm
                handleNewTransaction={this.handleNewTransaction}
              />
            </Container>
          </Col>
          <Col span={14}>
            <Container title="Transacciones" height="80vh" width="100%">
              {(loading && <Icon type="loading" />) ||
                (transactions.length > 0 &&
                  transactions.map(transaction => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))) ||
                'No hay transacciones registradas'}
            </Container>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default withApollo(DashboardTransactions);
