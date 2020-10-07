import * as React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';

class App extends React.Component {

  render = () => {
    return (
      <HashRouter>
        <Switch>
          <Route exact={true} path="/dashboard" component={Dashboard} />
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </HashRouter>
    );
  };
}

export default App;
