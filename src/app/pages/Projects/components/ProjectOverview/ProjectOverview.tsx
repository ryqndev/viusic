import type { ReactElement } from 'react';
import Swal from 'sweetalert2';
import Geopattern from 'geopattern';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg';
import type { RecordMetadata } from '../../../../controllers/records.types';
import cn from './ProjectOverview.module.scss';
import useRecords from '../../../../controllers/hooks/useRecords';

interface ProjectOverviewProps {
	selected: RecordMetadata | null;
}

const ProjectOverview = ({ selected }: ProjectOverviewProps): ReactElement => {
	const { deleteRecord } = useRecords();
	const navigate = useNavigate();

	if (!selected)
		return (
			<div className={cn.container}>
				<h1>Project Overview</h1>
				<hr />
				<h2 style={{ color: 'grey', letterSpacing: '1px' }}>
					[Select a project]
				</h2>
			</div>
		);

	const bg = Geopattern.generate(selected.id).toDataUrl();

	const confirmDeleteAndDelete = () => {
		Swal.fire({
			icon: 'question',
			title: 'Delete this project?',
			text: 'You cannot undo this action.',
			confirmButtonText: 'Yes, delete it!',
			showCancelButton: true,
		}).then(result => {
			if (result.isConfirmed) {
				deleteRecord(selected.id);
				Swal.fire({
					icon: 'success',
					text: `[${selected.name}] project deleted!`,
				});
			}
		});
	};

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
				<button
					className={cn.edit}
					onClick={() => navigate('/create/' + selected.id)}
				>
					<EditIcon />
					<p>edit</p>
				</button>
				<button className={cn.delete} onClick={confirmDeleteAndDelete}>
					<DeleteIcon />
					<p>delete</p>
				</button>
			</div>
		</div>
	);
};

export default ProjectOverview;
