import { ReactElement } from 'react';
import Geopattern from 'geopattern';
import cn from './ProjectCard.module.scss';
import { RecordMetadata } from '../../../../controllers/records.types';

const ProjectCard = ({ name, id }: RecordMetadata): ReactElement => {
	const bg = Geopattern.generate(id).toDataUrl();

	return (
		<div className={cn.container}>
			<div className={cn.frame}>
				<div className={cn.image} style={{ backgroundImage: bg }}></div>
			</div>
			<div className={cn.name}>{name}</div>
		</div>
	);
};

export default ProjectCard;
