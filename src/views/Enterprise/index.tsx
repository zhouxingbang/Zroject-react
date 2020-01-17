import React from 'react';
import {
    HashRouter as Router, 
    Route,
    Switch,
    useRouteMatch,
    useHistory
} from 'react-router-dom';
import Centre from './Centre';
import Scene from './Scene';

export default function Enterprise() {

    const { path, url} = useRouteMatch();
    const history = useHistory();

    React.useEffect(():any => {
        console.log(history);
        //history.replace(`/`);
        return () => {
        }
    },[]);

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={path} component={Centre}/>
                    <Route path={`${url}/scene`} component={Scene}/>
                </Switch>
            </div>
        </Router>
    )
}