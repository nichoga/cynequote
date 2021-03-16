import React, { useReducer } from 'react';
import FilmReducer from './FilmReducer';
import FilmContext from './FilmContext';
import {
    GET_FILMS,
    FILMS_ERROR,
    SET_CURRENT_FILM,
    CLEAR_CURRENT_FILM,
    DELETE_QUOTE
} from '../types';

const FilmState = (props) => {
    const initialState = {
        films: null,
        currentFilm: null,
        error: null,
    };

    const [state, dispatch] = useReducer(FilmReducer, initialState);

    const getFilms = async (language) => {
        try {
            const res = await fetch(`/${language}/films`);
            const data = await res.json();

            dispatch({
                type: GET_FILMS,
                payload: data,
            });

            clearCurrent();
        } catch (error) {
            dispatch({
                type: FILMS_ERROR,
                payload: error.response.statusText,
            });
        }
    };

    const setCurrent = (film) => {
        dispatch({
            type: SET_CURRENT_FILM,
            payload: film,
        });
    };

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT_FILM,
        });
    };

    const deleteQuote = async (language, film, quoteId) => {
        try {
            const updatedFilm = {
                id: film.id,
                title: film.title,
                quotes: film.quotes.filter(x=>x.id !== quoteId)
            }

            await fetch(`${language}/films/${film.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedFilm),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: DELETE_QUOTE,
                payload: updatedFilm
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <FilmContext.Provider
            value={{
                films: state.films,
                currentFilm: state.currentFilm,
                error: state.error,
                getFilms,
                setCurrent,
                clearCurrent,
                deleteQuote
            }}
        >
            {props.children}
        </FilmContext.Provider>
    );
};

export default FilmState;
