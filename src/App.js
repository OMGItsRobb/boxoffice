import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Nav from './Components/Nav.jsx';
import { Home } from './pages/Home.jsx';
import Starred from './pages/Starred.jsx';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exaxt path="/starred">
          <Starred />
        </Route>

        <Route>
          <div>
            <h1>404 Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
