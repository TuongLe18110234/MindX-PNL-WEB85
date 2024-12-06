import classes from './Card.module.css'

const Card = (props) => {
    const cardClasses = `${classes.card} ${props.isTransparent ? classes.transparent : ''}`;

    return (
        <div className={cardClasses}>
            {props.children}
        </div>
    );
};

export default Card;