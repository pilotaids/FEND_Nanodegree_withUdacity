import React from 'react';
import ReactDOM from 'react-dom';
import NeighborhoodMapApp from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
	<NeighborhoodMapApp />,
	document.getElementById('root')
);

registerServiceWorker();
