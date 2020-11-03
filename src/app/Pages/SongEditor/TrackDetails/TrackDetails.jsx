import Select from 'react-select';
import INSTRUMENTS_MAP from '../../../assets/instruments.json';
import ExpandWithIcon from '../../../components/basic/Expand/ExpandWithIcon';
import './TrackDetails.scss';

const TrackDetails = ({INSTRUMENTS, selectedData}) => {
    return (
        <div className="track-editor--wrapper">
            <h2>{selectedData?.name ?? 'track'} / {INSTRUMENTS_MAP[selectedData?.instrument] ?? 'instrument'}</h2>
            <ExpandWithIcon open label='Name'>
                <Select></Select>
            </ExpandWithIcon>
            <ExpandWithIcon open label='Instrument'>
                <Select></Select>
            </ExpandWithIcon>
            <ExpandWithIcon open label='Dis'>
                yes
            </ExpandWithIcon>
        </div>
    );
}

export default TrackDetails;
