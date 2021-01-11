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
                <Route exact path="">
                    <Redirect to="/new" />
                </Route>

                <Route exact path="/new">
                </Route>

                <Route exact path="/view">
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
