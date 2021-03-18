import React from 'react';
import QuoteItem from './QuoteItem';

const Quotes = ({ quotes, setCurrent }) => {
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">Quotes</h4>
            </li>
            {!quotes.length ? (
                <li className="center">No quotes to show...</li>
            ) : (
                quotes.map((quote) => (
                    <QuoteItem
                        className="collection-item"
                        key={quote.id}
                        quote={quote}
                        setCurrent={setCurrent}
                    ></QuoteItem>
                ))
            )}
        </ul>
    );
};

export default Quotes;
