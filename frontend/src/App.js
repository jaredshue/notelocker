import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/new" />
        </Route>

        <Route>
          <Header />
          
          <Route exact path="/new"></Route>

          <Route exact path="/view"></Route>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
