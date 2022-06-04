import React from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import Dumb from './components/Dumb';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';

const App = () => {

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/dumb" exact component={Dumb} />
          <Route path="/" exact component={LoginPage} />

          <Redirect to="/" />
        </Switch>
      </Layout>




      {/* <div>

        <LoginPage />
        
      </div> */}
    </>
  );
};

export default withRouter(App);
