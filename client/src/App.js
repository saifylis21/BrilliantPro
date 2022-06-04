import React from 'react';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Logout from './components/Navigation/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';

const App = () => {

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={Home} />

          <Redirect to="/" />
        </Switch>
      </Layout>
    </>
  );
};

export default withRouter(App);
