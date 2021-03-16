import React, { useEffect, useContext } from 'react';
import Preloader from '../layout/Preloader';
import LanguageContext from '../../context/language/LanguageContext';
import FilmContext from '../../context/film/FilmContext';
import QuoteContext from '../../context/quote/QuoteContext';
import QuoteItem from './QuoteItem';

const Quotes = () => {
    const languageContext = useContext(LanguageContext);
    const filmContext = useContext(FilmContext);
    const quoteContext = useContext(QuoteContext);

    const { films, currentFilm } = filmContext;
    const { currentLanguage } = languageContext;
    const {
        filteredQuotes,
        filterQuotes,
        getQuotes,
        clearQuotes,
    } = quoteContext;

    useEffect(() => {
        if (currentFilm !== null) {
            filterQuotes(currentFilm.quotes);
        } else {
            clearQuotes();
        }
    }, [currentFilm]);

    useEffect(() => {
        if (currentLanguage !== null) {
            getQuotes(currentLanguage.shortName);
        }
    }, [currentLanguage]);

    if (films === null) {
        return <Preloader />;
    }

    if (currentFilm === null) {
        return <p className="center">Select film to see quotes...</p>;
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">Quotes</h4>
            </li>
            {filteredQuotes === null || filteredQuotes.length === 0 ? (
                <li className="center">No quotes to show...</li>
            ) : (
                filteredQuotes.map((quote) => (
                    <QuoteItem
                        className="collection-item"
                        key={quote.id}
                        quote={quote}
                    ></QuoteItem>
                ))
            )}
        </ul>
    );
};

export default Quotes;
