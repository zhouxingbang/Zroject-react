import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import 'babel-polyfill';
import App from "./views/App";
import Login from "./views/Login";
import Studio from "./views/Studio";

ReactDOM.render(<Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about:id">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>
      <Route exact path="/" component={App}/>
      <Route path="/about" component={Login}/>
      <Route path="/topics" component={Studio}/>
    </div>
</Router>, document.getElementById("root") as HTMLDivElement);