import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard, ProjectOverview } from './components';
import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow_right.svg';
import { RecordMetadata } from '../../controllers/records.types';
import Swal from 'sweetalert2';
import useRecords from '../../controllers/hooks/useRecords';
import EXAMPLE_PROJECTS from './assets/exampleProjects';
import { useLiveQuery } from 'dexie-react-hooks';
import type { ProjectMetaData } from './project.types';
import cn from './Projects.module.scss';

const Projects = () => {
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
					onClick={() => selected?.id && navigate(`/create/${selected.id}`)}
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
							{...project.meta}
							selected={project.id === selected?.id}
							setSelected={setSelected}
						/>
					))}
				</div>
				<h1>Examples</h1>
				<div className={clsx(cn.list, cn.bottom)}>
					{Object.keys(EXAMPLE_PROJECTS).map(project => (
						<ProjectCard
							key={project}
							{...EXAMPLE_PROJECTS[
								project as keyof ProjectMetaData
							]}
							selected={project === selected?.id}
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
