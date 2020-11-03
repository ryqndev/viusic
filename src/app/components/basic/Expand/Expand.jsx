const Expand = ({open, children, className='', ...other}) => {
    return (
        <div className={"b-expand--wrapper " + (open ? "open" : "") + className} {...other}>
            {children}
        </div>
    )
}

export default Expand;