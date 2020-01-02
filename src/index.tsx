import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '~assets/css/styles.less';
import 'babel-polyfill';
import App from './views/App';

ReactDOM.render(<App />, document.getElementById("root") as HTMLDivElement);
