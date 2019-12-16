import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Table, Tag} from 'antd';
import {GET_SALES} from './graphql/queries';

const columns = [
  {
    title: 'VENDEDOR',
    dataIndex: 'seller',
    key: 'seller',
    render: text => <span>{text}</span>,
  },
  {
    title: 'ROL',
    dataIndex: 'role',
    key: 'role',
    render: role => (
      <Tag color={role === 'ARTISAN' ? 'blue' : '#52c41a'}>{role}</Tag>
    ),
  },
  {
    title: 'UNIDADES VENDIDAS',
    dataIndex: 'units',
    key: 'units',
    render: text => <span>{text}</span>,
  },
  {
    title: 'COMISIONES TOTALES',
    dataIndex: 'commissions',
    key: 'commissions',
    render: text => <span>{text}</span>,
  },
  {
    title: 'PRODUCTOS VENDIDOS',
    dataIndex: 'products',
    key: 'products',
    render: text => <span>{text}</span>,
  },
  {
    title: 'INGRESOS TOTALES',
    dataIndex: 'income',
    key: 'income',
    render: text => <span>{text}</span>,
  },
  {
    title: 'GANANCIA TOTAL',
    dataIndex: 'total',
    key: 'total',
    render: text => <span>{text}</span>,
  },
];

class SalesTable extends Component {
  state = {
    loading: true,
    sales: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loading: true});

    try {
      const {
        data: {sales: oldSales},
      } = await client.query({
        query: GET_SALES,
        variables: {filters: {}},
      });

      const sales = oldSales.map((sale, i) => ({
        key: i,
        seller: sale.seller.firstName + ' ' + sale.seller.lastName,
        role: sale.seller.role,
        units: sale.sales.length,
        commissions: `$ ${sale.commissions.reduce(
          (total, {commission}) => (total += commission),
          0
        )}`,
        products: sale.products.length,
        productsSold: sale.products
          .map(({productName}) => productName)
          .join(', '),
        income: `$ ${sale.products
          .reduce((total, {productionPrice}) => (total += productionPrice), 0)
          .toFixed(2)}`,
        total: `$ ${sale.total.toFixed(2)}`,
      }));

      this.setState({loading: false, sales});
    } catch (e) {
      this.setState({loading: false});
    }
  };

  render() {
    const {sales} = this.state;
    return (
      <Table
        columns={columns}
        expandedRowRender={sales => (
          <p style={{margin: 0, fontWeight: 600}}>{sales.productsSold}</p>
        )}
        dataSource={sales}
        tableLayout="fixed"
      />
    );
  }
}

export default withApollo(SalesTable);
