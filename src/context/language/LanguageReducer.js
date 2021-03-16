import { GET_LANGUAGES, SET_CURRENT_LANGUAGE } from '../types';

const LanguageReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_LANGUAGE:
            return {
                ...state,
                currentLanguage: action.payload,
            };
        case GET_LANGUAGES:
            return {
                ...state,
                languages: action.payload,
            };
        default:
            return state;
    }
};

export default LanguageReducer;
