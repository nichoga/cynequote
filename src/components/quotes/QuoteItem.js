import React from 'react';
import PropTypes from 'prop-types';

const QuoteItem = ({ quote, setCurrent }) => {
    return (
        <li className="collection-item">
            <a
                href="#delete-quote-modal"
                className="modal-trigger secondary-content"
                onClick={() => setCurrent(quote)}
            >
                <i className="material-icons grey-text">delete</i>
            </a>
            <a
                href="#edit-quote-modal"
                className="modal-trigger secondary-content"
                onClick={() => setCurrent(quote)}
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
