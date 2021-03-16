import React, { useContext, useEffect } from 'react';
import QuoteContext from '../../context/quote/QuoteContext';
import PropTypes from 'prop-types';

const QuoteItem = ({ quote }) => {
    const quoteContext = useContext(QuoteContext);

    const { setCurrent } = quoteContext;

    const onEdit = () => {
        setCurrent(quote);
    };

    const onDelete = () => {
        //setCurrent(film);
    };

    return (
        <li className="collection-item">
            <a href="#!" className="secondary-content" onClick={onDelete}>
                <i className="material-icons grey-text">delete</i>
            </a>
            <a
                href="#edit-quote-modal"
                className="modal-trigger secondary-content"
                onClick={onEdit}
            >
                <i className="material-icons grey-text">edit</i>
            </a>

            <div>
                <span>Actor: {quote.actor}</span>
                <br />
                <span>Text: {quote.quoteText}</span>
            </div>
        </li>
    );
};

QuoteItem.propTypes = {
    quote: PropTypes.object.isRequired,
};

export default QuoteItem;
