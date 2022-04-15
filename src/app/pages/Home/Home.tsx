import { Link } from 'react-router-dom';
import cn from './Home.module.scss';

const Home = () => {
	return (
		<div className={cn.container}>
			<Link to='/projects'>Start Composing</Link>
		</div>
	);
};

export default Home;
