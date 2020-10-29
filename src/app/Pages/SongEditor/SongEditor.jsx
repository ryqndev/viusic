import {useParams} from 'react-router-dom';
import {Card} from '../../components/basic';

const SongEditor = () => {
    const songid = useParams().id;
    return (
        <div className="song-editor--wrapper">
            <Card>hello</Card>
            yessir

        </div>
    )
}

export default SongEditor;