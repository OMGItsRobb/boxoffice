import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is Home page
      </Route>

      <Route exaxt path="/starred">
        This is starr3d content
      </Route>

      <Route>
        <h1>404 Page Not Found</h1>
      </Route>
    </Switch>
  );
}

export default App;
