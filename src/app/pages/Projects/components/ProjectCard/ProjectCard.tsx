import { ReactElement } from 'react';
import Geopattern from 'geopattern';
import cn from './ProjectCard.module.scss';

interface ProjectMetadataProps {
	name: string;
    artist: string;
    id: string;
}

const ProjectCard = ({ name }: ProjectMetadataProps): ReactElement => {
	const bg = Geopattern.generate(name).toDataUrl();

	return (
		<div className={cn.container}>
			<div className={cn.image} style={{ backgroundImage: bg }}></div>
			<div className={cn.name}>{name}</div>
		</div>
	);
};

export default ProjectCard;
