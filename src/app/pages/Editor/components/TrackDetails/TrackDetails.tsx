import clsx from 'clsx';
import { ReactElement, useContext, useState, useRef, useEffect, memo } from 'react';
import type { Track } from '../../../../controllers/tracks.types';
import { ReactComponent as FirstPageIcon } from '../../../../../assets/icons/first_page.svg';
import Swal from 'sweetalert2';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg';
import cn from './TrackDetails.module.scss';
import useTracks from '../../controllers/useTracks';
import ProjectContext from '../../controllers/ProjectContext';

interface TrackDetailsProps {
	current: null | string
	setCurrent: (track: null | string) => void;
}

const TrackDetails = ({
	current,
	setCurrent,
}: TrackDetailsProps): ReactElement => {
	const [details, setDetails] = useState<null | any>(null);
	const [expanded, setExpanded] = useState(true);
	const project = useContext(ProjectContext);
	const { deleteTrack, editTrack, getTrack } = useTracks();
	const labelRef = useRef<HTMLInputElement>(null);
	const [editMode, setEditMode] = useState<boolean>(false);

	useEffect(() => {
		if(!current || !project) return;
		
		getTrack(project.id, current).then(setDetails);
	}, [current, project, getTrack]);

	useEffect(() => {
		setEditMode(false);
	}, [current]);

	if (!details || !project)
		return (
			<div className={clsx(cn.container, expanded && cn.expanded)}>
				<button
					className={clsx(cn.expand, expanded && cn.expanded)}
					onClick={() => setExpanded(prev => !prev)}
				>
					<FirstPageIcon />
				</button>
				<h1>Track Overview</h1>
				<hr />
				<p style={{ fontSize: '2em', margin: '30px 0' }}>
					<span>[ Select a Track ]</span>
				</p>
			</div>
		);

	const toggleEditModeOrUpdate = () => {
		if(!current) return;
		const label = labelRef?.current?.textContent ?? '';
		if (editMode && label !== details?.label) {
			editTrack(project.id, current, { label: label });
		}
		setEditMode(prev => !prev);
	};

	const confirmAndDeleteTrack = () => {
		if (!project || !current) return;

		Swal.fire({
			icon: 'question',
			title: 'Delete this track?',
			text: 'You cannot undo this action.',
			confirmButtonText: 'Yes, delete it!',
			showCancelButton: true,
		}).then(result => {
			if (result.isConfirmed) {
				deleteTrack(project.id, current);
				setCurrent(null);
				Swal.fire({
					icon: 'success',
					text: `[${current}] track deleted!`,
				});
			}
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
			<h1>Track Overview</h1>
			<hr />
			<div className={cn.details}>
				<h2
					ref={labelRef}
					suppressContentEditableWarning={true}
					contentEditable={editMode}
					onKeyDown={(e) => e.stopPropagation()}
				>
					{details.label}
				</h2>
				<p>
					<span>Type:</span> {details.type}
				</p>
				<p>
					<span>Instrument:</span> {details.instrument}
				</p>
			</div>
			<hr />
			<div className={cn.details}>
				<p>
					<span>Volume:</span> {details.baseVolume}
				</p>
				<p>
					<span>Muted:</span> {details.muted.toString()}
				</p>
				<p>
					<span>Monitored:</span> {details.monitored.toString()}
				</p>
				<p>
					<span>Length:</span> {details.length}
				</p>
				<p>
					<span>Repeat:</span> {JSON.stringify(details.repeat)}
				</p>
				<p>
					<span>Sustain:</span> {JSON.stringify(details.sustain)}
				</p>
			</div>
			<hr />
			<div className={cn.actions}>
				<button className={cn.edit} onClick={toggleEditModeOrUpdate}>
					<EditIcon />
					<p>edit</p>
				</button>
				<button className={cn.delete} onClick={confirmAndDeleteTrack}>
					<DeleteIcon />
					<p>delete</p>
				</button>
			</div>
			<hr />
			<p className={cn.id}>{details.id}</p>
		</div>
	);
};

export default memo(TrackDetails);
