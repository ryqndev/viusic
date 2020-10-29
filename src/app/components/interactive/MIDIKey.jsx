const MIDIKey = ({e, i}) => {
    const unsetBinding = () => {
        console.log("Binding has not been set!");
    }
    return (
        <button
            className="key"
            key={i}
            onMouseDown={e ?? unsetBinding}
            onTouchStart={e ?? unsetBinding}
            onTouchEnd={e => e.preventDefault()}
        >
        </button>
    )
}

export default MIDIKey;