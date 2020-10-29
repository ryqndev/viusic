import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter as Router} from 'react-router-dom';
import App from './app';

ReactDOM.render(
	<React.StrictMode>
		<Router
			basename={process.env.PUBLIC_URL}
			initialEntries={['/', '/login', '/app']}
			initialIndex={0}
		>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);