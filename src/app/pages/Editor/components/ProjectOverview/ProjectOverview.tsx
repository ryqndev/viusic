import { useContext, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ReactElement, ChangeEvent } from 'react';
import ProjectContext from '../../controllers/ProjectContext';
import clsx from 'clsx';
import { ReactComponent as FirstPageIcon } from '../../../../../assets/icons/first_page.svg';
import { ReactComponent as AddIcon } from '../../../../../assets/icons/add_circle.svg';
import { ReactComponent as UnmutedIcon } from '../../../../../assets/icons/volume_up.svg';
import { ReactComponent as MutedIcon } from '../../../../../assets/icons/muted.svg';
import { ReactComponent as HeadsetIcon } from '../../../../../assets/icons/headset.svg';
import { ReactComponent as HeadsetOffIcon } from '../../../../../assets/icons/headset_off.svg';
import cn from './ProjectOverview.module.scss';
import useRecords from '../../../../controllers/hooks/useRecords';
import useTracks from '../../controllers/useTracks';

interface ProjectOverviewProps {
	setShowCreateTrackPrompt: (prev: boolean) => void;
}

const ProjectOverview = ({
	setShowCreateTrackPrompt,
}: ProjectOverviewProps): ReactElement | null => {
	const { editMetaData } = useRecords();
	const { editTrack } = useTracks();

	const [expanded, setExpanded] = useState(true);
	const project = useContext(ProjectContext);

	const [bpm, setBpm] = useState<string | number>(project?.bpm ?? 0);

	if (!project) return null;

	const changeBPM = (e: ChangeEvent<HTMLInputElement>) => {
		let userBPM: string | number = e.target.value;

		setBpm(userBPM.replace(/\D/g, ''));

		userBPM = parseInt(userBPM);

		if (!isNaN(userBPM) && userBPM > 0 && userBPM < 1016)
			editMetaData(project.id, {
				bpm: userBPM,
			});
	};
	const changeTimeSignature = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
		const timeSignature: number[] = project.timeSignature;

		timeSignature[idx] = parseInt(e.target.value.replace(/\D/g, ''));

		editMetaData(project.id, {
			timeSignature,
		});
	};

	return (
		<div className={clsx(cn.container, expanded && cn.expanded)}>
			<Link className={cn.back} to='/projects'>
				back to projects
			</Link>
			<button
				className={clsx(cn.expand, expanded && cn.expanded)}
				onClick={() => setExpanded(prev => !prev)}
			>
				<FirstPageIcon />
			</button>
			<h1>{project.name}</h1>
			<h2>{project.artist}</h2>
			<hr />
			<div className={cn.details}>
				<h3>Tempo</h3>
				<div className={cn.setting}>
					<p>Beats/Min:</p>
					<input type='number' value={bpm} onChange={changeBPM} />
				</div>
				<div className={cn.setting}>
					<p>Time Signature:</p>
					<div className={cn.signature}>
						<input type='number' value={project.timeSignature[0]} onChange={changeTimeSignature(0)} />
						<span>/</span>
						<input type='number' value={project.timeSignature[1]} onChange={changeTimeSignature(1)} />
					</div>
					
				</div>
			</div>
			<hr />
			<div className={cn.details}>
				<h3>
					Tracklist{' '}
					<AddIcon
						viewBox='0 0 48 48'
						onClick={() => setShowCreateTrackPrompt(true)}
					/>
				</h3>
				{!project.tracks.length && (
					<div className={cn.empty}>No Tracks Yet...</div>
				)}
				<div className={cn.tracklist}>
					{project.tracks.map(track => (
						<div className={cn.track} key={track.id}>
							<h3 className={cn.label}>{track.label}</h3>
							<h3 className={cn.instrument}>
								[{track.instrument}]
							</h3>
							<div className={cn.actions}>
								<button
									onClick={() =>
										editTrack(project.id, track.id, {
											monitored: !track.monitored,
										})
									}
								>
									{track.monitored ? (
										<HeadsetIcon viewBox='0 0 48 48' />
									) : (
										<HeadsetOffIcon
											viewBox='0 0 48 48'
											style={{ fill: 'red' }}
										/>
									)}
								</button>
								<button
									onClick={() =>
										editTrack(project.id, track.id, {
											muted: !track.muted,
										})
									}
								>
									{track.muted ? (
										<MutedIcon
											viewBox='0 0 48 48'
											style={{ fill: 'red' }}
										/>
									) : (
										<UnmutedIcon viewBox='0 0 48 48' />
									)}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<hr />
		</div>
	);
};

export default memo(ProjectOverview);
