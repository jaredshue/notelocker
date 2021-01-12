import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import NewView from './views/NewView'
import NewNote from './views/NewNote'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/new" />
        </Route>

        <Route>
          <Header />

          <Route exact path="/new">
            <NewNote/>
          </Route>

          <Route exact path="/view"></Route>
            <NewView/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
