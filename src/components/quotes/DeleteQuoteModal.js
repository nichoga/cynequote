import React, { useContext, useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import QuoteContext from '../../context/quote/QuoteContext';
import LanguageContext from '../../context/language/LanguageContext';
import FilmContext from '../../context/film/FilmContext';

const EditQuoteModal = () => {
    const quoteContext = useContext(QuoteContext);
    const filmContext = useContext(FilmContext);
    const languageContext = useContext(LanguageContext);

    const [film, setFilm] = useState(null);
    const [quote, setQuote] = useState(null);

    const { currentQuote, deleteQuote } = quoteContext;
    const { currentFilm } = filmContext;
    const { currentLanguage } = languageContext;

    useEffect(() => { 
        if(currentQuote){
            setQuote(currentQuote);
        }
    }, [currentQuote])

    useEffect(() => { 
        if(currentFilm){
            setFilm(currentFilm);
        }
    }, [currentFilm])

    const onSubmit = () => {
        deleteQuote(currentLanguage.shortName, quote.id)
        filmContext.deleteQuote(currentLanguage.shortName, film, quote.id);
        M.toast({ html: 'Quote deleted' });
    };

    return (
        <div id="delete-quote-modal" className="modal">
            <div className="modal-content">
                <span>
                    Are you sure you want to delete a quote?
                </span>
            </div>
            <div className="modal-footer">
                <a
                    href="#!"
                    onClick={onSubmit}
                    className="modal-close waves-effect blue btn"
                >
                    Yes
                </a>
                <a
                    href="#!"
                    className="modal-close waves-effect blue btn"
                >
                    No
                </a>
            </div>
        </div>
    );
};

export default EditQuoteModal;
