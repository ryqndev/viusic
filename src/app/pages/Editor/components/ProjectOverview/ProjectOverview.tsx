import { ReactElement, useContext, memo } from 'react';
import ProjectContext from '../../controllers/ProjectContext';
import cn from './ProjectOverview.module.scss';

const ProjectOverview = (): ReactElement | null => {
	const projects = useContext(ProjectContext);

    if(!projects) return null;

	return (
		<div className={cn.container}>
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
