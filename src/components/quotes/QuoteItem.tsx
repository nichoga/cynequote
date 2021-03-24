import { FC } from 'react';
import { Quote } from '../../data/models/Quote';

type Props = {
    quote: Quote,
    setCurrent: (quote: Quote) => void
}

const QuoteItem : FC<Props> = ({ quote, setCurrent }) => {
    return (
        <li className="collection-item" data-testid={`quote_${quote.id}`}>
            <a
                href="#delete-quote-modal"
                data-testid={`deleteQuote_${quote.id}`}
                className="modal-trigger secondary-content"
                onClick={() => setCurrent(quote)}
            >
                <i className="material-icons grey-text">delete</i>
            </a>
            <a
                href="#edit-quote-modal"
                data-testid={`editQuote_${quote.id}`}
                className="modal-trigger secondary-content"
                onClick={() => setCurrent(quote)}
            >
                <i className="material-icons grey-text">edit</i>
            </a>

            <div>
                <div className="row">
                    <span className="col s1">Actor:</span>
                    <span className="col s6"> {quote.actor}</span>
                </div>
                <div className="row">
                    <span className="col s1">Text:</span>
                    <span className="col s6"> {quote.quoteText}</span>
                </div>
            </div>
        </li>
    );
};

export default QuoteItem;
