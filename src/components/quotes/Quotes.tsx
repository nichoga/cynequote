import React, { FC } from 'react';
import { Quote } from '../../data/models/Quote';
import QuoteItem from './QuoteItem';

type Props = {
    quotes: Quote[],
    setCurrent: (quote: Quote) => void
}

const Quotes : FC<Props> = ({ quotes, setCurrent }) => {
    return (
        <ul className="collection with-header" data-testid="quotesList">
            <li className="collection-header">
                <h4 className="center">Quotes</h4>
            </li>
            {!quotes.length ? (
                <li className="center">No quotes to show...</li>
            ) : (
                quotes.map((quote) => (
                    <QuoteItem
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
