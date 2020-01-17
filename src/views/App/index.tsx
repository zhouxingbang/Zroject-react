import React from 'react';
import {
    HashRouter as Router, 
    Route,
    Switch
} from 'react-router-dom';
import Login from '../Login';
import Enterprise from '../Enterprise';

export default function App() {

    React.useEffect(() => {
        return () => {
            
        };
    }, []);

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/enterprise" component={Enterprise}/>
                </Switch>
            </div>
        </Router>
    )
}