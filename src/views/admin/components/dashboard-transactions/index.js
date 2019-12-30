import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import debounce from 'debounce';
import moment from 'moment';
import toast from 'toast-me';
import {Form, Row, Col, Select, DatePicker, Input, Icon} from 'antd';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import paymentMethods from 'utils/enums/paymentMethods';
import TransactionCard from './components/transaction';
import Results from './components/results';
import TransactionForm from './components/transaction-form';
import EditForm from './components/edit-form';
import {GET_TRANSACTIONS, GET_RESULTS} from './graphql/queries';

const {Search} = Input;
const {Option} = Select;
const {RangePicker} = DatePicker;

class DashboardTransactions extends Component {
  state = {
    filters: {
      search: '',
      start: null,
      end: null,
      paymentMethods: [],
    },
    loading: false,
    loadingResults: false,
    transactions: [],
    currentTransaction: null,
    total: 0,
    ins: 0,
    outs: 0,
    paymentMethods: new Set(paymentMethods),
  };

  componentDidMount = async () => this.getTransactions();

  getTransactions = debounce(async () => {
    const {client} = this.props;
    const {
      filters: {search, start, end, paymentMethods},
    } = this.state;
    this.setState({
      loading: true,
      loadingResults: true,
      total: 0,
      ins: 0,
      outs: 0,
    });

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
          variables: {filters: {search, start, end, paymentMethods}},
        }),
        client.query({
          query: GET_RESULTS,
          variables: {filters: {search, start, end, paymentMethods}},
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
  }, 200);

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

  setCurrentTransaction = currentTransaction =>
    this.setState({currentTransaction});

  togglePriceModal = () => {
    const {showPriceModal} = this.state;

    this.setState({showPriceModal: !showPriceModal});
  };

  onPaymentMethodDeselect = paymentMethod => {
    const {paymentMethods: oldPaymentMethods} = this.state;
    const paymentMethods = new Set(oldPaymentMethods);

    paymentMethods.add(paymentMethod);
    this.setState({paymentMethods}, this.getTransactions);
  };

  handleFilterChange = (key, value) => {
    const {filters: oldFilters} = this.state;

    console.log(value);

    const filters = {...oldFilters};
    key === 'paymentMethods'
      ? (filters.paymentMethods = [...value])
      : (filters[key] = value);

    this.setState({filters}, this.getTransactions);
  };

  handleDateFilterChange = dates => {
    const {filters: oldFilters} = this.state;

    const start = dates[0];
    const end = dates[1];
    const filters = {...oldFilters, start, end};

    this.setState({filters}, this.getTransactions);
  };

  render() {
    const {collapsed, onCollapse, user} = this.props;
    const {
      filters,
      loading,
      loadingResults,
      transactions,
      total,
      ins,
      outs,
      paymentMethods,
      currentTransaction,
    } = this.state;

    const TransactionRegisterForm = Form.create({name: 'origin'})(
      TransactionForm
    );
    const TransactionEditForm = Form.create({name: 'transactionEdit'})(
      EditForm
    );

    const start = filters.start
      ? moment(filters.start).format('YYYY-MM-DD')
      : null;
    const end = filters.end ? moment(filters.end).format('YYYY-MM-DD') : null;

    return (
      <Layout
        collapsed={collapsed}
        onCollapse={onCollapse}
        page="Transactions"
        user={user}
      >
        <Row gutter={{xs: 8, sm: 16, md: 24}} style={{width: '97%'}}>
          <Col span={10}>
            <Container
              title={`Resultados ${
                !start && !end ? 'históricos' : 'de ' + start + ' a ' + end
              }`}
              width="100%"
            >
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
              <Row type="flex" justify="center">
                <Col style={{padding: 5}} span={8}>
                  <Search
                    style={{width: '100%'}}
                    placeholder="Filtrar por título y descripción"
                    onChange={({target: {value}}) =>
                      this.handleFilterChange('search', value)
                    }
                  />
                </Col>
                <Col style={{padding: 5}} span={8}>
                  <Select
                    style={{width: '100%'}}
                    placeholder="Método de pago"
                    allowClear
                    mode="multiple"
                    tokenSeparators={[',']}
                    onChange={value =>
                      this.handleFilterChange('paymentMethods', value)
                    }
                    onDeselect={this.onPaymentMethodDeselect}
                  >
                    {[...paymentMethods]
                      .filter(
                        paymentMethod =>
                          filters.paymentMethods.indexOf(paymentMethod) === -1
                      )
                      .map(paymentMethod => (
                        <Option key={paymentMethod} value={paymentMethod}>
                          {paymentMethod}
                        </Option>
                      ))}
                  </Select>
                </Col>
                <Col style={{padding: 5}} span={8}>
                  <RangePicker
                    ranges={{
                      'De hoy': [moment(), moment()],
                      'De este mes': [
                        moment().startOf('month'),
                        moment().endOf('month'),
                      ],
                      'Del mes pasado': [
                        moment()
                          .startOf('month')
                          .subtract(1, 'month'),
                        moment()
                          .endOf('month')
                          .subtract(1, 'month'),
                      ],
                    }}
                    onChange={dates => this.handleDateFilterChange(dates)}
                  />
                </Col>
              </Row>
              {(loading && <Icon type="loading" />) ||
                (transactions.length > 0 &&
                  transactions.map(transaction => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      setCurrentTransaction={this.setCurrentTransaction}
                    />
                  ))) ||
                'No hay transacciones registradas'}
            </Container>
            {currentTransaction && (
              <TransactionEditForm
                currentTransaction={currentTransaction}
                setCurrentTransaction={this.setCurrentTransaction}
              />
            )}
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default withApollo(DashboardTransactions);
