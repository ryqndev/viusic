import type { ReactElement } from 'react';
import useTracks from '../../controllers/useTracks';
import { ReactComponent as MutedIcon } from '../../../../../assets/icons/muted.svg';
import { ReactComponent as UnmutedIcon } from '../../../../../assets/icons/volume_up.svg';
import cn from './MuteButton.module.scss';

interface MuteButtonProps {
	recordid: string;
	trackid: string;
	muted: boolean;
}

const MuteButton = ({
	recordid,
	trackid,
	muted,
}: MuteButtonProps): ReactElement => {
	const { editTrack } = useTracks();

	return (
		<button
			className={cn.container}
			onClick={() =>
				editTrack(recordid, trackid, {
					muted: !muted,
				})
			}
		>
			{muted ? (
				<MutedIcon viewBox='0 0 48 48' style={{ fill: 'red' }} />
			) : (
				<UnmutedIcon viewBox='0 0 48 48' />
			)}
		</button>
	);
};

export default MuteButton;
