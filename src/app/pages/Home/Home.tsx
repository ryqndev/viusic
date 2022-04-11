import { Link } from 'react-router-dom';
import cn from './Home.module.scss';

const Home = () => {
	return (
		<div className={cn.container}>
			<Link to='/list'>Start Composing</Link>
		</div>
	);
};

export default Home;
