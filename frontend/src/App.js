import React from "react";
import {
        BrowserRouter,
        Switch,
        Route,
        Redirect
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header.js";
import ViewNote from "./views/ViewNote.js";
import NewNote from "./views/NewNote.js";

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
                        <NewNote />
                    </Route>

                    <Route exact path="/view">
                        <ViewNote />
                    </Route>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
