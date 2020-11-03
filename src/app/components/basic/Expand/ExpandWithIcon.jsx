import {useState} from 'react';
import Expand from './Expand';

const ExpandWithIcon = ({open, label='', className='', children, ...other}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={"b-expand-with-icon--wrapper" + className} {...other}>
            <div className="label-with-icon" onClick={() => {setExpanded(expand => !expand)}}>
                <div>{label}</div>
                <div className="icon">{open ? '+' : '-'}</div>
            </div>
            <Expand open={expanded}>
                {children}
            </Expand>
        </div>
    );
}

export default ExpandWithIcon;