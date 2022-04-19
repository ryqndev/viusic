import clsx from 'clsx';
import { useState } from 'react';
import type { Track } from '../../../../../../controllers/tracks.types';
import { TrackItemProps } from '../../TrackList';
import cn from './Midi.module.scss';

const Midi = ({setCurrent, ...props}: TrackItemProps) => {
    const [expanded, setExpanded] = useState(true);
    const select = () => {
        if(expanded) {
            setCurrent(null);
            setExpanded(false);    
        }else {
            setCurrent(props);
            setExpanded(true);  
        }
    }
    
    return (
        <div className={clsx(cn.container, expanded && cn.expanded)} onClick={select}>
        
        </div>
    );
}

export default Midi;

