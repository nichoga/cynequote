import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useFilmsContext } from '../../data/useFilms';

const AddQuoteModal = () => {
    const { addQuote, films } = useFilmsContext();

    const [actor, setActor] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [filmId, setFilmId] = useState('');

    const onSubmit = async () => {
        if (actor === '' || quoteText === '' || filmId === '') {
            M.toast({ html: 'Please enter an Author and Quote Text and Film' });
        } else {
            const newQuote = {
                actor,
                quoteText,
            };

            await addQuote(filmId, newQuote);

            M.toast({ html: 'Quote created' });

            setActor('');
            setQuoteText('');
            setFilmId('');
        }
    };

    return (
        <div id="add-quote-modal" className="modal">
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
                <div className="row">
                    <div className="input-field">
                        <select
                            name="film"
                            value={filmId}
                            className="browser-default"
                            onChange={(e) => setFilmId(e.target.value)}
                        >
                            <option value="" disabled>
                                Select Film
                            </option>
                            {films?.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.title}
                                </option>
                            ))}
                        </select>
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

export default AddQuoteModal;
