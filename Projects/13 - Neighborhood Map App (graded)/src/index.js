import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NeighborhoodMapApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NeighborhoodMapApp />, document.getElementById('root'));
registerServiceWorker();
