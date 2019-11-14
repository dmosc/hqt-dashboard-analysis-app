import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import GET_USER_DATA from './requests';

export const withAuthContext = React.createContext(null);

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = props.auth;
  }

  componentDidMount = async () => {
    const {tokenLoaded} = this.state;
    if (!tokenLoaded) {
      this.getToken();
    }
    this.getUserData();
  };

  setUserId = userId => this.setState({userId});

  clearUserId = () => this.setState({userId: ''});

  setToken = token => this.setState({token});

  clearToken = () => this.setState({token: ''});

  getUserData = async () => {
    const {client} = this.props;
    const cookies = document.cookie.split(';');
    if (cookies) {
      const idData = cookies.find(cookie => cookie.includes('uuid'));
      if (idData) {
        const id = idData.split('=')[1];
        this.setState({userId: id});
        const {
          data: {user}
        } = await client.query({
          query: GET_USER_DATA,
          variables: {userId: id}
        });
        this.setState({user});
      }
    }
  };

  getToken = () => {
    const cookies = document.cookie.split(';');
    if (cookies) {
      const tokenData = cookies.find(cookie => cookie.includes('token'));
      if (tokenData) {
        const token = tokenData.split('=')[1];
        this.setState({token});
      }
    }
    this.setState({tokenLoaded: true});
  };

  render() {
    const {userId, user, token, tokenLoaded} = this.state;
    const {children} = this.props;
    return (
      <withAuthContext.Provider
        value={{
          userId,
          user,
          token,
          tokenLoaded,
          getUserData: this.getUserData,
          setUserId: this.setUserId,
          clearUserId: this.clearUserId,
          setToken: this.setToken,
          getToken: this.getToken,
          clearToken: this.clearToken
        }}
      >
        {children}
      </withAuthContext.Provider>
    );
  }
}

AuthProvider.defaultProps = {
  auth: {
    userId: '',
    user: null,
    token: '',
    tokenLoaded: false
  }
};

export default withApollo(AuthProvider);
