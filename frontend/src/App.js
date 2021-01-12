import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import NewView from './views/NewView'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/new" />
                </Route>

                <Route exact path="/new">
                </Route>

                <Route exact path="/view">
                    <NewView />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
