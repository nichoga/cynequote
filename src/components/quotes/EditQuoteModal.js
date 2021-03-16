import React, { useState, useEffect, useContext } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import QuoteContext from '../../context/quote/QuoteContext';
import LanguageContext from '../../context/language/LanguageContext';
import FilmContext from '../../context/film/FilmContext';
import FilmSelectOptions from '../film/FilmSelectOptions';

const EditQuoteModal = () => {
    const quoteContext = useContext(QuoteContext);
    const filmContext = useContext(FilmContext);
    const languageContext = useContext(LanguageContext);

    const { currentQuote, updateQuote, filterQuotes } = quoteContext;
    const { currentFilm } = filmContext;

    const [actor, setActor] = useState('');
    const [quoteText, setQuoteText] = useState(false);
    const [film, setFilm] = useState('');

    useEffect(() => {
        if (currentQuote) {
            setActor(currentQuote.actor);
            setQuoteText(currentQuote.quoteText);
        }
    }, [currentQuote]);

    useEffect(() => {
        if (currentFilm) {
            setFilm(currentFilm.id);
        }
    }, [currentFilm]);

    const onSubmit = () => {
        if (actor === '' || quoteText === '') {
            M.toast({ html: 'Please enter an Author and Quote Text' });
        } else {
            console.log('submit');
            const updatedQuote = {
                id: currentQuote.id,
                actor,
                quoteText,
            };

            updateQuote(
                languageContext.currentLanguage.shortName,
                updatedQuote
            );

            M.toast({ html: 'Quote updated' });

            setActor('');
            setQuoteText('');

            // setAttention(false);
        }
    };

    return (
        <div id="edit-quote-modal" className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="actor"
                            value={actor}
                            onChange={(e) => setActor(e.target.value)}
                        />
                        <label htmlFor="actor" className="active">
                            Actor
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="quoteText"
                            value={quoteText}
                            onChange={(e) => setQuoteText(e.target.value)}
                        />
                        <label htmlFor="quoteText" className="active">
                            Quote Text
                        </label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a
                    href="#!"
                    onClick={onSubmit}
                    className="modal-close waves-effect blue btn"
                >
                    Enter
                </a>
            </div>
        </div>
    );
};

export default EditQuoteModal;