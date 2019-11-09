import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#FF0000',
    '0.15': '#FF7F00',
    '0.3': '#FFFF00',
    '0.45': '#00FF00',
    '0.6': '#0000FF',
    '0.75': '#2E2B5F',
    '0.9': '#8B00FF',
    '1.0': '#8B00FF'
  },
  shadowBlur: 5
});

/* webpackChunkName: "DashboardInventory" */
const DashboardInventory = Loadable({
  loader: () => import('./components/dashboard-inventory'),
  loading: TopBarProgress
});

/* webpackChunkName: "DashboardHome" */
const DashboardHome = Loadable({
  loader: () => import('./components/dashboard-home'),
  loading: TopBarProgress
});

/* webpackChunkName: "DashboardTransactions" */
const DashboardTransactions = Loadable({
  loader: () => import('./components/dashboard-transactions'),
  loading: TopBarProgress
});

/* webpackChunkName: "DashboardAnalytics" */
const DashboardAnalytics = Loadable({
  loader: () => import('./components/dashboard-analytics'),
  loading: TopBarProgress
});

/* webpackChunkName: "DashboardArtisans" */
const DashboardArtisans = Loadable({
  loader: () => import('./components/dashboard-artisans'),
  loading: TopBarProgress
});

/* webpackChunkName: "DashboardEvents" */
const DashboardEvents = Loadable({
  loader: () => import('./components/dashboard-events'),
  loading: TopBarProgress
});

/* webpackChunkName: "DashboardResources" */
const DashboardResources = Loadable({
  loader: () => import('./components/dashboard-resources'),
  loading: TopBarProgress
});

class Admin extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({collapsed});
  };

  render() {
    const {collapsed} = this.state;
    return (
      <Switch>
        <Route
          path="/admin/home"
          render={() => (
            <DashboardHome collapsed={collapsed} onCollapse={this.onCollapse} />
          )}
        />
        <Route
          path="/admin/inventory"
          render={() => (
            <DashboardInventory
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            />
          )}
        />
        <Route
          path="/admin/transactions"
          render={() => (
            <DashboardTransactions
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            />
          )}
        />
        <Route
          path="/admin/data-analytics"
          render={() => (
            <DashboardAnalytics
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            />
          )}
        />
        <Route
          path="/admin/artisans"
          render={() => (
            <DashboardArtisans
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            />
          )}
        />
        <Route
          path="/admin/events"
          render={() => (
            <DashboardEvents
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            />
          )}
        />
        <Route
          path="/admin/resources"
          render={() => (
            <DashboardResources
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            />
          )}
        />
        <Redirect from="/admin" to="/admin/home" />
      </Switch>
    );
  }
}

export default Admin;
