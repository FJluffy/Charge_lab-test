import './App.css';
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './containers/Home';
import Profile from './containers/Profile';
import UpdateUser from './containers/UpdateUser';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/updateUser" component={UpdateUser} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
