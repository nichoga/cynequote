import React, { useReducer } from 'react';
import LanguageContext from './LanguageContext';
import LanguageReducer from './LanguageReducer';
import { SET_CURRENT_LANGUAGE, GET_LANGUAGES, LANGUAGES_ERROR } from '../types';

const LanguageState = (props) => {
    const initialState = {
        languages: null,
        currentLanguage: null,
        error: null,
    };

    const [state, dispatch] = useReducer(LanguageReducer, initialState);

    const getLanguages = async () => {
        try {
            const res = await fetch('languages');
            const data = await res.json();

            dispatch({
                type: GET_LANGUAGES,
                payload: data,
            });

            console.log(data[0]);
            setCurrentLanguage(data[0]);
        } catch (error) {
            console.log(error);
            dispatch({
                type: LANGUAGES_ERROR,
                payload: error.response.statusText,
            });
        }
    };

    const setCurrentLanguage = (language) => {
        dispatch({
            type: SET_CURRENT_LANGUAGE,
            payload: language,
        });
    };

    return (
        <LanguageContext.Provider
            value={{
                languages: state.languages,
                currentLanguage: state.currentLanguage,
                error: state.error,
                getLanguages,
                setCurrentLanguage,
            }}
        >
            {props.children}
        </LanguageContext.Provider>
    );
};

export default LanguageState;
