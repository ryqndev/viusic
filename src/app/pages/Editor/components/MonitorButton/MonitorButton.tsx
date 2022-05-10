import useTracks from '../../controllers/useTracks';
import { ReactComponent as HeadsetIcon } from '../../../../../assets/icons/headset.svg';
import { ReactComponent as HeadsetOffIcon } from '../../../../../assets/icons/headset_off.svg';
import cn from './MonitorButton.module.scss';

interface MonitorButtonProps {
	recordid: string;
	trackid: string;
	monitored: boolean;
}

const MonitorButton = ({
	recordid,
	trackid,
	monitored,
}: MonitorButtonProps) => {
	const { editTrack } = useTracks();

	return (
		<button
            className={cn.container}
			onClick={() =>
				editTrack(recordid, trackid, {
					monitored: !monitored,
				})
			}
		>
			{monitored ? (
				<HeadsetIcon viewBox='0 0 48 48' />
			) : (
				<HeadsetOffIcon viewBox='0 0 48 48' style={{ fill: 'red' }} />
			)}
		</button>
	);
};

export default MonitorButton;
