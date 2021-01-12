import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                   
                </Route>

                <Route exact path="/new">
                </Route>

                <Route exact path="/NewView.js">
                   <Redirect to="/view" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
