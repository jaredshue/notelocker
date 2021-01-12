import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import NewNote from "./views/NewNote"

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
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
