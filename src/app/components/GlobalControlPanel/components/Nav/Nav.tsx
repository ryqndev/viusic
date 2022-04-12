import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from './Nav.module.scss';

interface NavProps {
	links?: [];
	customLinks?: [];
}

const sharedLinks = {
	home: {
		path: '/',
	},
};

const Nav = ({ links = [], customLinks = [] }: NavProps): ReactElement => {
	return (
		<nav className={cn.container}>
			{links.map(link => {
				const { path } = sharedLinks[link];
				return (
					<Link key={path} to={path}>
						<></>
					</Link>
				);
			})}
			{customLinks.map(({ path, link }) => (
				<Link key={path} to={path}>
					<></>
				</Link>
			))}
		</nav>
	);
};

export default Nav;
