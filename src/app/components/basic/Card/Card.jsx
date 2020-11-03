const Card = ({children, className='', ...other}) => {
    return (
        <div className={'b-card--wrapper ' + className} {...other}>
            {children}
        </div>
    )
}

export default Card;