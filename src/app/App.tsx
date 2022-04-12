import { Routes, Route } from 'react-router-dom';
import Footer from '@ryqndev/footer';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Projects from './pages/Projects';
import { GlobalControlPanel } from './components';
// import ProjectContext from './controllers/ProjectsContext';

const App = () => {
	return (
		<div>
			<GlobalControlPanel />
			<Routes>
				<Route index element={<Home />} />
				<Route path='projects' element={<Projects />} />
				<Route path='edit' element={<Projects />}>
					<Route path=':id' element={<Editor />} />
				</Route>
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
