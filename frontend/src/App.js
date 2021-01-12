import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from './components/Header';
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

          <Route exact path="/view">
            <NewView/>
          </Route>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
