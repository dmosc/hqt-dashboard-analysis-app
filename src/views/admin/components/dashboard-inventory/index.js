import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import {Form, Row} from 'antd';
import {DragDropContext} from 'react-beautiful-dnd';
import toast from 'toast-me';
import Layout from 'components/layout/admin';
import Container from 'components/common/container';
import Column from './components/column';
import ProductForm from './components/product-form';
import GarmentForm from './components/garment-form';
import {
  GET_ARTISANS,
  GET_LOCATIONS,
  GET_INVENTORY,
  GET_PRODUCT_TYPES,
} from './graphql/queries';
import RegisterForm from './components/register-form';
import SellForm from './components/sell-form';

const data = {
  tasks: {
    'task-1': {id: 'task-1', content: 'TASK TEST1'},
    'task-2': {id: 'task-2', content: 'TASK TEST2'},
    'task-3': {id: 'task-3', content: 'TASK TEST'},
    'task-4': {id: 'task-4', content: 'TASK TEST'},
    'task-5': {id: 'task-5', content: 'TASK TEST'},
    'task-8': {id: 'task-8', content: 'TASK TEST'},
    'task-9': {id: 'task-9', content: 'TASK TEST'},
    'task-10': {id: 'task-10', content: 'TASK TEST'},
    'task-11': {id: 'task-11', content: 'TASK TEST'},
    'task-12': {id: 'task-12', content: 'TASK TEST'},
  },
  columns: {
    production: {
      id: 'production',
      title: 'Production',
      description: 'Products that are still not available but in process',
      taskIds: [],
    },
    stock: {
      id: 'stock',
      title: 'Stock',
      description: 'Products available at any location',
      taskIds: [],
    },
    dispatched: {
      id: 'dispatched',
      title: 'Dispatched',
      description: 'Products already sold and delivered',
      taskIds: [],
    },
  },
  columnOrder: ['production', 'stock', 'dispatched'],
};

class DashboardInventory extends Component {
  state = {
    info: data,
    form: 'product',
    currentProductId: '',
    artisans: [],
    locations: [],
    productTypes: [],
    modalForm: '',
  };

  componentDidMount = async () => {
    const {client} = this.props;
    const {info} = this.state;

    try {
      const [
        {
          data: {artisans},
        },
        {
          data: {locations},
        },
        {
          data: {productTypes},
        },
        {
          data: {inventory},
        },
      ] = await Promise.all([
        client.query({
          query: GET_ARTISANS,
          variables: {
            filters: {limit: 10},
          },
        }),
        client.query({
          query: GET_LOCATIONS,
          variables: {
            filters: {limit: 10},
          },
        }),
        client.query({
          query: GET_PRODUCT_TYPES,
          variables: {
            filters: {limit: 10},
          },
        }),
        client.query({
          query: GET_INVENTORY,
        }),
      ]);

      const tasks = {};
      const columns = {
        production: {
          id: 'production',
          title: 'Production',
          description: 'Products that are still not available but in process',
          taskIds: [],
        },
        stock: {
          id: 'stock',
          title: 'Stock',
          description: 'Products available at any location',
          taskIds: [],
        },
        dispatched: {
          id: 'dispatched',
          title: 'Dispatched',
          description: 'Products already sold and delivered',
          taskIds: [],
        },
      };
      inventory.production.forEach(({id, productName}) => {
        tasks[id] = {id, content: productName};
        columns.production.taskIds.push(id);
      });
      inventory.stock.forEach(({id, productName}) => {
        tasks[id] = {id, content: productName};
        columns.stock.taskIds.push(id);
      });
      inventory.dispatched.forEach(({id, productName}) => {
        tasks[id] = {id, content: productName};
        columns.dispatched.taskIds.push(id);
      });

      const newInfo = {...info, tasks, columns};

      this.setState({artisans, locations, productTypes, info: {...newInfo}});
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  handleFormType = form => this.setState({form});

  showModal = modalForm => {
    this.setState({modalForm});
  };

  onDragEnd = data => {
    const {info} = this.state;
    const {destination, source, draggableId} = data;
    this.setState({currentProductId: draggableId});

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = info.columns[source.droppableId];
    const end = info.columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {...start, taskIds: newTaskIds};
      const newInfo = {
        ...info,
        columns: {
          ...info.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState({info: newInfo});
    } else {
      if (start.id === 'production' && end.id === 'stock')
        this.showModal('register');
      else if (start.id === 'stock' && end.id === 'dispatched')
        this.showModal('sell');
      else return;

      const startTaskIds = Array.from(start.taskIds);
      const endTaskIds = Array.from(end.taskIds);
      startTaskIds.splice(source.index, 1);
      endTaskIds.splice(destination.index, 0, draggableId);

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const newEnd = {
        ...end,
        taskIds: endTaskIds,
      };

      const newInfo = {
        ...info,
        columns: {
          ...info.columns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd,
        },
      };

      this.setState({info: newInfo});
    }
  };

  render() {
    const {
      info,
      form,
      currentProductId,
      artisans,
      locations,
      productTypes,
      modalForm,
    } = this.state;
    const {collapsed, onCollapse, user} = this.props;

    const ProductRegisterForm = Form.create({name: 'product'})(ProductForm);
    const GarmentRegisterForm = Form.create({name: 'garment'})(GarmentForm);
    const RegisterLocation = Form.create({name: 'register'})(RegisterForm);
    const RegisterSell = Form.create({name: 'sell'})(SellForm);

    return (
      <React.Fragment>
        <Layout
          collapsed={collapsed}
          onCollapse={onCollapse}
          page="Inventory"
          user={user}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container width="75%">
              <Row type="flex" gutter={[40]} justify="center">
                {info.columnOrder.map(columnId => {
                  const column = info.columns[columnId];
                  const tasks = column.taskIds.map(
                    taskId => info.tasks[taskId]
                  );

                  return (
                    <Column key={column.id} column={column} tasks={tasks} />
                  );
                })}
              </Row>
            </Container>
          </DragDropContext>
          <Container
            title={`${form === 'product' ? 'Product' : 'Garment'}`}
            width="25%"
          >
            {form === 'product' ? (
              <ProductRegisterForm
                artisans={artisans}
                locations={locations}
                productTypes={productTypes}
              />
            ) : (
              <GarmentRegisterForm
                artisans={artisans}
                locations={locations}
                productTypes={productTypes}
              />
            )}
            {form === 'product' ? (
              <Link to="#" onClick={() => this.handleFormType('garment')}>
                Register a Garment
              </Link>
            ) : (
              <Link to="#" onClick={() => this.handleFormType('product')}>
                Register a Product
              </Link>
            )}
          </Container>
        </Layout>
        <RegisterLocation
          visible={modalForm === 'register'}
          locations={locations}
          showModal={this.showModal}
          handleModalSumbit={this.handleModalSumbit}
          currentProductId={currentProductId}
        />
        <RegisterSell
          visible={modalForm === 'sell'}
          locations={locations}
          showModal={this.showModal}
          handleModalSumbit={this.handleModalSumbit}
          currentProductId={currentProductId}
        />
      </React.Fragment>
    );
  }
}

export default withApollo(DashboardInventory);
