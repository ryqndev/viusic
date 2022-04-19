import { ReactElement, useContext } from 'react';
import type { Track } from '../../../../controllers/tracks.types';
import { ReactComponent as ArrowRightIcon } from '../../../../../assets/icons/arrow_right.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg';
import cn from './TrackDetails.module.scss';
import useTracks from '../../controllers/useTracks';
import ProjectContext from '../../controllers/ProjectContext';

interface TrackDetailsProps {
	current: Track | null;
    setCurrent: (track: Track | null) => void;
}

const TrackDetails = ({ current, setCurrent }: TrackDetailsProps): ReactElement => {
    const project = useContext(ProjectContext);
	const { deleteTrack } = useTracks();

	if (!current || !project) return <div className={cn.container}>No track selected</div>;

	return (
		<div className={cn.container}>
			{JSON.stringify(current, null, 4)}
			<hr />
			<div className={cn.actions}>
				<button className={cn.view}>
					<ArrowRightIcon />
					<p>view</p>
				</button>
				<button className={cn.edit}>
					<EditIcon />
					<p>edit</p>
				</button>
				<button
					className={cn.delete}
					onClick={() => {
                        deleteTrack(project.id, current.id);
                        setCurrent(null);
                    }}
				>
					<DeleteIcon />
					<p>delete</p>
				</button>
			</div>
		</div>
	);
};

export default TrackDetails;
