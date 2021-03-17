import React, { useReducer } from 'react';
import QuoteContext from './QuoteContext';
import QuoteReducer from './QuoteReducer';
import {
    GET_QUOTES,
    ADD_QUOTE,
    DELETE_QUOTE,
    UPDATE_QUOTE,
    SET_CURRENT_QUOTE,
    FILTER_QUOTES,
    CLEAR_QUOTES,
} from '../types';

const QuoteState = (props) => {
    const initialState = {
        quotes: null,
        filteredQuotes: null,
        currentQuote: null,
        lastAddedQuote: null
    };

    const [state, dispatch] = useReducer(QuoteReducer, initialState);

    const getQuotes = async (language) => {
        try {
            const res = await fetch(`/${language}/quotes`);
            const data = await res.json();

            dispatch({
                type: GET_QUOTES,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const setCurrent = (quote) => {
        dispatch({
            type: SET_CURRENT_QUOTE,
            payload: quote,
        });
    };

    const deleteQuote = async (language, id) => {
        try {
            await fetch(`${language}/quotes/${id}`, {
                method: 'DELETE',
            });

            dispatch({
                type: DELETE_QUOTE,
                payload: id,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const addQuote = async (language, quote) => {
        try {
            const res = await fetch(`${language}/quotes`, {
                method: 'POST',
                body: JSON.stringify(quote),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const data = await res.json();

            dispatch({
                type: ADD_QUOTE,
                payload: data,
            });

            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuote = async (language, quote) => {
        try {
            const res = await fetch(`${language}/quotes/${quote.id}`, {
                method: 'PUT',
                body: JSON.stringify(quote),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            dispatch({
                type: UPDATE_QUOTE,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const filterQuotes = (ids) => {
        dispatch({
            type: FILTER_QUOTES,
            payload: ids,
        });
    };

    const clearQuotes = () => {
        dispatch({
            type: CLEAR_QUOTES,
        });
    };

    return (
        <QuoteContext.Provider
            value={{
                quotes: state.quotes,
                currentQuote: state.currentQuote,
                filteredQuotes: state.filteredQuotes,
                lastAddedQuote: state.lastAddedQuote,
                getQuotes,
                setCurrent,
                deleteQuote,
                addQuote,
                updateQuote,
                filterQuotes,
                clearQuotes,
            }}
        >
            {props.children}
        </QuoteContext.Provider>
    );
};

export default QuoteState;
