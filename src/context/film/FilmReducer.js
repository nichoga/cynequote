import {
    GET_FILMS,
    FILMS_ERROR,
    SET_CURRENT_FILM,
    CLEAR_CURRENT_FILM,
} from '../types';

const FilmReducer = (state, action) => {
    switch (action.type) {
        case GET_FILMS:
            return {
                ...state,
                films: action.payload,
            };
        case FILMS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case SET_CURRENT_FILM:
            return {
                ...state,
                currentFilm: action.payload,
            };
        case CLEAR_CURRENT_FILM:
            return {
                ...state,
                currentFilm: null,
            };
        default:
            return state;
    }
};

export default FilmReducer;
