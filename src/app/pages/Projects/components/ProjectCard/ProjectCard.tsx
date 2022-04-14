import clsx from 'clsx';
import { ReactElement, SetStateAction, Dispatch, memo } from 'react';
import Geopattern from 'geopattern';
import cn from './ProjectCard.module.scss';
import { RecordMetadata } from '../../../../controllers/records.types';

interface ProjectCardProps extends RecordMetadata {
	selected: boolean;
	setSelected: Dispatch<SetStateAction<RecordMetadata | null>>;
}

const ProjectCard = ({
	selected = false,
	setSelected,
	...data
}: ProjectCardProps): ReactElement => {
	const bg = Geopattern.generate(data.id).toDataUrl();

	return (
		<div
			className={clsx(cn.container, selected && cn.selected)}
			onClick={() => setSelected(data)}
		>
			<div className={cn.frame}>
				<div className={cn.image} style={{ backgroundImage: bg }}></div>
			</div>
			<div className={cn.name}>{data.name}</div>
		</div>
	);
};

export default memo(ProjectCard);
