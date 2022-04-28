import { ReactElement, useContext, memo, useState } from 'react';
import ProjectContext from '../../controllers/ProjectContext';
import clsx from 'clsx';
import { ReactComponent as FirstPageIcon } from '../../../../../assets/icons/first_page.svg';
import cn from './ProjectOverview.module.scss';

const ProjectOverview = (): ReactElement | null => {
	const [expanded, setExpanded] = useState(true);
	const projects = useContext(ProjectContext);

    if(!projects) return null;

	return (
		<div className={clsx(cn.container, expanded && cn.expanded)}>
			<button
				className={clsx(cn.expand, expanded && cn.expanded)}
				onClick={() => setExpanded(prev => !prev)}
			>
				<FirstPageIcon />
			</button>
            <h1>{projects.name}</h1>
            <h2>{projects.artist}</h2>
            <hr />
			<div className={cn.details}>
			{projects?.tracks.map(track => (
				<div className={cn.track} key={track.id}>
					<h3>{track.label}</h3>
					<h3 className={cn.instrument}>[{track.instrument}]</h3>
				</div>
			))}</div>
            <hr />
		</div>
	);
};

export default memo(ProjectOverview);
