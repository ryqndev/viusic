const Track = ({notes, length}) => {
    return (
        <div className="track--wrapper">
            {JSON.stringify(notes)}
        </div>
    );
}

export default Track;