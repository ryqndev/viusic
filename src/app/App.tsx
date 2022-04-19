import { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '@ryqndev/footer';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Projects from './pages/Projects';

const App = () => {
	return (
		<div>
			<Routes>
				<Route index element={<Home />} />
				<Route path='projects' element={<Projects />} />
				<Route path='create'>
					<Route index element={<Projects />} />
					<Route path=':id' element={<Editor />} />
				</Route>
			</Routes>
			<Footer />
		</div>
	);
};

export default memo(App);
