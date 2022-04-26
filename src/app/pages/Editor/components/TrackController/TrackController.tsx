import type { ReactElement } from 'react';
import { ReactComponent as PlayIcon } from '../../../../../assets/icons/play.svg';
import { ReactComponent as PauseIcon } from '../../../../../assets/icons/pause.svg';
import cn from './TrackController.module.scss';

interface TrackControllerProps {
	isPlaying: boolean;
	play: () => void;
}

const TrackController = ({
	isPlaying,
	play,
}: TrackControllerProps): ReactElement => {

	return (
		<div className={cn.container}>
			<button className={cn.play} onClick={play}>
				{isPlaying ? (
					<PauseIcon viewBox='0 0 48 48' />
				) : (
					<PlayIcon viewBox='0 0 48 48' />
				)}
			</button>
		</div>
	);
};

export default TrackController;
