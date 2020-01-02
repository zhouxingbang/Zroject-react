import * as React from 'react';
import {
    BrowserRouter as Router, 
    Route,
    Switch
} from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';

export default function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/zroject" component={Home}/>
                </Switch>
            </div>
        </Router>
    )
}