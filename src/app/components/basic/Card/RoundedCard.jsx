const RoundedCard = ({children, className='', ...other}) => {
    return (
        <div className={'b-card--wrapper rounded ' + className} {...other}>
            {children}
        </div>
    )
}

export default RoundedCard;