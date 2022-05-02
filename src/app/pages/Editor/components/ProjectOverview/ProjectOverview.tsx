import { useContext, memo, useState } from 'react';
import type { ReactElement, ChangeEvent } from 'react';
import ProjectContext from '../../controllers/ProjectContext';
import clsx from 'clsx';
import { ReactComponent as FirstPageIcon } from '../../../../../assets/icons/first_page.svg';
import cn from './ProjectOverview.module.scss';
import useRecords from '../../../../controllers/hooks/useRecords';

const ProjectOverview = (): ReactElement | null => {
	const { editMetaData } = useRecords();

	const [expanded, setExpanded] = useState(true);
	const project = useContext(ProjectContext);

	const [bpm, setBpm] = useState<string | number>(project?.bpm ?? 0);

	if (!project) return null;

	const changeBPM = (e: ChangeEvent<HTMLInputElement>) => {
		let userBPM: string | number = e.target.value;

		setBpm(userBPM.replace(/\D/g, ''));

		userBPM = parseInt(userBPM);

		if (!isNaN(userBPM) && userBPM > 0 && userBPM < 1016)
			editMetaData(project.id, {
				bpm: userBPM,
			});
	};

	return (
		<div className={clsx(cn.container, expanded && cn.expanded)}>
			<button
				className={clsx(cn.expand, expanded && cn.expanded)}
				onClick={() => setExpanded(prev => !prev)}
			>
				<FirstPageIcon />
			</button>
			<h1>{project.name}</h1>
			<h2>{project.artist}</h2>
			<hr />
			<div className={cn.details}>
				{project?.tracks.map(track => (
					<div className={cn.track} key={track.id}>
						<h3>{track.label}</h3>
						<h3 className={cn.instrument}>[{track.instrument}]</h3>
					</div>
				))}
			</div>
			<hr />
			BPM: <input type='number' value={bpm} onChange={changeBPM} />
		</div>
	);
};

export default memo(ProjectOverview);
