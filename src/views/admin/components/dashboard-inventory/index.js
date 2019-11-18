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
import {GET_ARTISANS, GET_LOCATIONS} from './graphql/queries';

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
    'col-1': {
      id: 'col-1',
      title: 'Production',
      taskIds: ['task-4', 'task-5'],
    },
    'col-2': {
      id: 'col-2',
      title: 'Stock',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'col-3': {
      id: 'col-3',
      title: 'Dispatched',
      taskIds: ['task-11', 'task-12'],
    },
  },
  columnOrder: ['col-1', 'col-2', 'col-3'],
};

class DashboardInventory extends Component {
  state = {
    info: data,
    form: 'product',
    artisans: [],
    locations: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;

    try {
      const [
        {
          data: {artisans},
        },
        {
          data: {locations},
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
      ]);

      this.setState({artisans, locations});
    } catch (e) {
      toast(e, 'error', {duration: 3000, closeable: true});
    }
  };

  handleFormType = form => this.setState({form});

  onDragEnd = data => {
    const {info} = this.state;
    const {destination, source, draggableId} = data;

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
    const {info, form, artisans, locations} = this.state;
    const {collapsed, onCollapse, user} = this.props;

    const ProductRegisterForm = Form.create({name: 'product'})(ProductForm);
    const GarmentRegisterForm = Form.create({name: 'garment'})(GarmentForm);

    return (
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
                const tasks = column.taskIds.map(taskId => info.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks} />;
              })}
            </Row>
          </Container>
        </DragDropContext>
        <Container
          title={`${form === 'product' ? 'Product' : 'Garment'}`}
          width="25%"
        >
          {form === 'product' ? (
            <ProductRegisterForm artisans={artisans} locations={locations} />
          ) : (
            <GarmentRegisterForm artisans={artisans} locations={locations} />
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
    );
  }
}

export default withApollo(DashboardInventory);
