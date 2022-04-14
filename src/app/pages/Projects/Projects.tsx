import { v4 as uuidv4 } from 'uuid';
import { useState, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard, ProjectOverview } from './components';
import cn from './Projects.module.scss';
import { RecordMetadata, Record } from '../../controllers/records.types';
import useRecords from '../../controllers/hooks/useRecords';
import EXAMPLE_PROJECTS from './assets/exampleProjects';
import type { ProjectMetaData } from './project.types';

const Projects = () => {
	const [projects, setProjects] = useState<Record[]>([]);
	const [selected, setSelected] = useState<RecordMetadata | null>(null);
	const { createNewRecord, getRecords } = useRecords();
	const navigate = useNavigate();

	useEffect(() => {
		getRecords().then(setProjects);
	}, [getRecords]);

	const create = () => {
		const id = uuidv4();
		createNewRecord({
			id: id, // #TODO: check if id is new and unique
			name: 'New Project',
			artist: 'New Artist',
			date: {
				created: Date.now(),
				edited: Date.now(),
			},
		}).then(() => {
			navigate('/create/' + id);
		});
	};

	return (
		<div className={cn.container}>
			<div className={cn.projects}>
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
				<div className={cn.list}>
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
