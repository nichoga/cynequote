import React, { useState, useEffect, FC } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useFilmsContext } from '../../data/film/useFilms'

const EditQuoteModal : FC = () => {
    const { updateQuote, currentQuote } = useFilmsContext();

    const [actor, setActor] = useState('');
    const [quoteText, setQuoteText] = useState('');

    useEffect(() => {
        if (currentQuote) {
            setActor(currentQuote.actor);
            setQuoteText(currentQuote.quoteText);
        }
    }, [currentQuote]);

    const onSubmit = () => {
        if (actor === '' || quoteText === '' || !currentQuote) {
            M.toast({ html: 'Please enter an Actor and Quote Text' });
        } else {
            const updatedQuote = {
                id: currentQuote.id,
                actor,
                quoteText,
            };

            updateQuote(updatedQuote);

            M.toast({ html: 'Quote updated' });

            setActor('');
            setQuoteText('');
        }
    };

    return (
        <div id="edit-quote-modal" data-testid="edit-quote-modal" className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="actor"
                            id="actor"
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
                            id="quoteText"
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
                    data-testid="editQuoteSubmit"
                >
                    Save quote
                </a>
            </div>
        </div>
    );
};

export default EditQuoteModal;
