import {
    GET_QUOTES,
    ADD_QUOTE,
    DELETE_QUOTE,
    UPDATE_QUOTE,
    SET_CURRENT_QUOTE,
    FILTER_QUOTES,
    CLEAR_QUOTES,
} from '../types';

const QuoteReducer = (state, action) => {
    switch (action.type) {
        case GET_QUOTES:
            return {
                ...state,
                quotes: action.payload,
            };
        case ADD_QUOTE:
            return {
                ...state,
                quotes: [...state.quotes, action.payload],
            };
        case DELETE_QUOTE:
            return {
                ...state,
                quotes: state.quotes.filter((x) => x.id !== action.payload),
            };
        case UPDATE_QUOTE:
            return {
                ...state,
                quotes: state.quotes.map((x) =>
                    x.id === action.payload.id ? action.payload : x
                ),
                filteredQuotes: state.filteredQuotes.map((x) =>
                    x.id === action.payload.id ? action.payload : x
                ),
            };
        case SET_CURRENT_QUOTE:
            return {
                ...state,
                currentQuote: action.payload,
            };
        case FILTER_QUOTES:
            return {
                ...state,
                filteredQuotes: state.quotes.filter((x) =>
                    action.payload.includes(x.id)
                ),
            };
        case CLEAR_QUOTES:
            return {
                ...state,
                filteredQuotes: null,
            };
        default:
            return state;
    }
};

export default QuoteReducer;
