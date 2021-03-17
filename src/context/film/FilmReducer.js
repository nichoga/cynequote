import {
    GET_FILMS,
    FILMS_ERROR,
    SET_CURRENT_FILM,
    CLEAR_CURRENT_FILM,
    DELETE_QUOTE,
    ADD_QUOTE
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
        case DELETE_QUOTE:
            return {
                ...state,
                currentFilm: action.payload,
                films: state.films.map(x=> x.id === action.payload.id ? action.payload : x)
            };
        case ADD_QUOTE:
            return {
                ...state, 
                films: state.films.map(x=> x.id === action.payload.id ? action.payload : x),
                currentFilm: state.currentFilm === null ? null : action.payload
            }
        default:
            return state;
    }
};

export default FilmReducer;
