import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import toast from 'toast-me';
import {Icon} from 'antd';
import {GET_RESOURCES} from './graphql/queries';
import ResourceCard from './components/resource-card';

class ResourceList extends Component {
  state = {
    loading: false,
    resources: [],
  };

  componentDidMount = async () => {
    const {client} = this.props;
    this.setState({loading: true});

    try {
      const {
        data: {resources},
      } = await client.query({
        query: GET_RESOURCES,
        variables: {filters: {limit: 10}},
      });

      this.setState({loading: false, resources});
    } catch (e) {
      toast('No se pudieron cargar los recursos');
    }
  };

  render() {
    const {loading, resources} = this.state;

    return (
      (resources.length === 0 && <span>No hay recursos disponibles</span>) ||
      (!loading &&
        resources.map(resource => <ResourceCard resource={resource} />)) || (
        <Icon type="loading" />
      )
    );
  }
}

export default withApollo(ResourceList);
