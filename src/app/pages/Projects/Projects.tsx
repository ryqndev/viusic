import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { useState, memo, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard, ProjectOverview } from './components';
import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow_right.svg';
import { RecordMetadata } from '../../controllers/records.types';
import Swal from 'sweetalert2';
import useRecords from '../../controllers/hooks/useRecords';
import EXAMPLE_PROJECTS from './assets/exampleProjects';
import { useLiveQuery } from 'dexie-react-hooks';
import cn from './Projects.module.scss';

const Projects = (): ReactElement | null => {
	const [selected, setSelected] = useState<RecordMetadata | null>(null);
	const { createNewRecord, getRecords } = useRecords();
	const navigate = useNavigate();

	const projects = useLiveQuery(getRecords);

	if (!projects) return null;

	const create = async () => {
		Swal.fire({
			icon: 'question',
			title: 'Name your new project',
			input: 'text',
			confirmButtonText: 'Create Project',
			showCancelButton: true,
		}).then(({ value, isConfirmed }) => {
			if (!isConfirmed) return;

			const id = uuidv4();
			createNewRecord({
				id: id, // #TODO: check if id is new and unique
				name: value === '' ? 'Untitled Project' : value,
				artist: 'Untitled Artist',
				date: {
					created: Date.now(),
					edited: Date.now(),
				},
				bpm: 120,
				masterVolume: -10,
				timeSignature: [4, 4],
			}).then(() => {
				navigate('/create/' + id);
			});
		});
	};

	return (
		<div className={cn.container}>
			<div className={cn.projects}>
				<button
					className={clsx(cn.edit, selected && cn.enabled)}
					onClick={() => {
						if (selected?.id === 'sample-playing-god') {
							fetch(
								'https://cdn.jsdelivr.net/gh/ryqndev/viusic/src/app/pages/Projects/assets/sample-playing-god.json'
							).then(res => res.json()
							).then(data => {
								const id = uuidv4();
								createNewRecord({
									...data,
									id: id,
								}).then(() => {
									navigate('/create/' + id);
								});
							});
						} else selected?.id && navigate(`/create/${selected.id}`);
					}}
				>
					<ArrowRightIcon />
				</button>
				<h1>Your Projects</h1>
				<div className={cn.list}>
					<div className={cn.new} onClick={create}>
						<div className={cn.image}>+</div>
						Create New
					</div>
					{projects.map(project => (
						<ProjectCard
							key={project.id}
							{...project}
							selected={project.id === selected?.id}
							setSelected={setSelected}
						/>
					))}
				</div>
				<h1>Examples</h1>
				<div className={clsx(cn.list, cn.bottom)}>
					{EXAMPLE_PROJECTS.map((project: RecordMetadata) => (
						<ProjectCard
							key={project.id}
							{...project}
							selected={project.id === selected?.id}
							setSelected={setSelected}
						/>
					))}
				</div>
			</div>

			<div className={cn.details}>
				<ProjectOverview selected={selected} />
			</div>
		</div>
	);
};

export default memo(Projects);
