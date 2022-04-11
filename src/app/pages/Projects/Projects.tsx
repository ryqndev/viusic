import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { ProjectCard } from './components';
import cn from './Projects.module.scss';

interface ProjectMetaData {
    [key: string]: {
        name: string;
        artist:string;
        id: string;
        date: {
            created: number;
            edited: number;
        }
    }
}

const EXAMPLE_USER_PROJECTS:ProjectMetaData = {
	'50c72492-cd45-4525-a864-745c76a4503a': {
		name: 'End of it',
        artist: 'Friday Pilot\'s club',
        id: '50c72492-cd45-4525-a864-745c76a4503a',
        date: {
            created: 1649637001547,
            edited: 1649637001547,
        }
	},
};

const EXAMPLE_PROJECTS:ProjectMetaData = {
	'bd35583c-02de-4d51-ae70-664e36d24264': {
		name: 'Heat Waves',
        artist: 'Glass Animals',
        id: 'bd35583c-02de-4d51-ae70-664e36d24264',
        date: {
            created: 1649637001547,
            edited: 1649637001547,
        }
	},
	'751120d5-0296-47fa-89e8-53042e7a1558': {
		name: 'Stay',
        artist: 'Justin Bieber',
        id: '751120d5-0296-47fa-89e8-53042e7a1558',
        date: {
            created: 1649637001547,
            edited: 1649637001547,
        }
	},
	'94a8ada4-4418-4e56-a643-aa943aa8bb81': {
		name: 'Enemy',
        artist: 'Imagine Dragons',
        id: '94a8ada4-4418-4e56-a643-aa943aa8bb81',
        date: {
            created: 1649637001547,
            edited: 1649637001547,
        }
	},
	'0e79723a-aa54-47ac-8981-1edc687fa62f':{
		name: 'Louder than Bombs',
        artist: 'BTS',
        id: '0e79723a-aa54-47ac-8981-1edc687fa62f',
        date: {
            created: 1649637001547,
            edited: 1649637001547,
        }
	},
};

const Projects = () => {
    const [selected, setSelected] = useState(null);

	return (
		<div className={cn.container}>
			<div className={cn.projects}>
				<h1>Your Projects</h1>
				<div className={cn.list}>
					<div className={cn.new}>
						<div className={cn.image}>+</div>
                        Create New
					</div>
					{Object.keys(EXAMPLE_USER_PROJECTS).map(project => (
						<ProjectCard key={project} {...EXAMPLE_USER_PROJECTS[project]} />
					))}
				</div>
				<h1>Examples</h1>
				<div className={cn.list}>
					{Object.keys(EXAMPLE_PROJECTS).map(project => (
						<ProjectCard key={project} {...EXAMPLE_PROJECTS[project]} />
					))}
				</div>
			</div>

			<div className={cn.details}></div>
		</div>
	);
};

export default Projects;
