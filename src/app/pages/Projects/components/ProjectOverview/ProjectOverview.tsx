import type { ReactElement } from 'react';
import Geopattern from 'geopattern';
import type { RecordMetadata } from '../../../../controllers/records.types';
import cn from './ProjectOverview.module.scss';
import useRecords from '../../../../controllers/hooks/useRecords';

interface ProjectOverviewProps {
	selected: RecordMetadata | null;
}

const ProjectOverview = ({ selected }: ProjectOverviewProps): ReactElement => {
	const { deleteRecord } = useRecords();
	if (!selected)
		return (
			<div className={cn.container}>
				<h1>Project Overview</h1>
				<hr />
				<h2 style={{color: 'grey', letterSpacing: '1px'}}>
					[Select a project]
				</h2>
			</div>
		);

	const bg = Geopattern.generate(selected.id).toDataUrl();

	return (
		<div className={cn.container}>
			<h1>Project Overview</h1>
			<hr />

			<div className={cn.image} style={{ backgroundImage: bg }}></div>

			<h1>{selected.name}</h1>
			<h2>{selected.artist}</h2>

			<hr />

			<div className={cn.details}>
				<p>
					<span>Created:</span>{' '}
					{new Date(selected.date.created)
						.toString()
						.substring(0, 21)}
				</p>
				<p>
					<span>Edited:</span>{' '}
					{new Date(selected.date.edited).toString().substring(0, 21)}
				</p>
			</div>

			<hr />

			<div className={cn.actions}>
				<button onClick={() => deleteRecord(selected.id)}>
					delete
				</button>
				{/* {selected && <>{JSON.stringify(selected)}</>} */}
			</div>
		</div>
	);
};

export default ProjectOverview;
