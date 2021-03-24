import { createContext, Dispatch, FC, SetStateAction, useCallback, useContext, useState } from 'react';
import { filmDataProvider } from './filmDataProvider';
import { useLanguageContext } from '../language/useLanguage';
import { Film } from '../models/Film';
import { Quote } from '../models/Quote';

interface IUseFilms {
    films: Film[];
    quotes: Quote[] | undefined;
    currentFilm: Film | undefined;
    currentQuote: Quote | undefined;
    addQuote: (filmId: string, quote: Quote) => Promise<void>;
    removeQuote: () => Promise<void>;
    init: () => Promise<void>;
    updateQuote: (quote: Quote) => Promise<void>;
    setCurrentFilm: Dispatch<SetStateAction<Film | undefined>>;
    setCurrentQuote: Dispatch<SetStateAction<Quote | undefined>>;
}

const useFilms = () : IUseFilms => {
    const { currentLanguage } = useLanguageContext();

    const [films, setFilms] = useState<Film[]>([]);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [currentFilm, setCurrentFilm] = useState<Film>();
    const [currentQuote, setCurrentQuote] = useState<Quote>();

    const lang = currentLanguage?.shortName;

    const addQuote = useCallback(
        async (filmId: string, quote: Quote) => {
            const { quote: newQuoute, film } = await filmDataProvider.addQuote({
                language: lang!,
                filmId,
                quote,
            });

            setQuotes((prevQuotes) => {
                const clone = prevQuotes.slice();
                clone.push(newQuoute);
                return clone;
            });

            setFilms((prevFilms) => {
                return prevFilms.map((x) => (x.id === film.id ? film : x));
            });

            if (currentFilm?.id === film.id) {
                setCurrentFilm(film);
            }
        },
        [lang, currentFilm]
    );

    const removeQuote = useCallback(async () => {
        const updatedFilm = await filmDataProvider.removeQuote({
            language: lang!,
            filmId: currentFilm!.id,
            quoteId: currentQuote!.id!,
        });

        setQuotes((prevQuotes) => {
            return prevQuotes.filter((x) => x.id !== currentQuote!.id);
        });

        setFilms((prevFilms) => {
            return prevFilms.map((x) =>
                x.id === updatedFilm.id ? updatedFilm : x
            );
        });
    }, [lang, currentFilm, currentQuote]);

    const updateQuote = useCallback(
        async (quote) => {
            const updatedQuote = await filmDataProvider.updateQuote({
                language: lang!,
                quote,
            });

            setQuotes((prevQuotes) => {
                return prevQuotes.map((x) =>
                    x.id === quote.id ? updatedQuote : x
                );
            });
        },
        [lang]
    );

    const init = useCallback(async () => {
        if (!lang) return;

        const [films, quotes] = await Promise.all([
            filmDataProvider.loadFilms(lang),
            filmDataProvider.loadQuotes(lang),
        ]);

        setFilms(films);
        setQuotes(quotes);
        
    }, [lang]);

    return {
        films,
        quotes,
        currentFilm,
        currentQuote,
        addQuote,
        removeQuote,
        init,
        setCurrentFilm,
        setCurrentQuote,
        updateQuote,
    };
};

const FilmContext = createContext<IUseFilms | undefined>(undefined);

export const FilmContextProvider: FC = ({ children }) => {
    const filmsProps = useFilms();

    return (
        <FilmContext.Provider value={filmsProps}>
            {children}
        </FilmContext.Provider>
    );
};

export const useFilmsContext = () => {
    const ctx =  useContext(FilmContext);
    if (!ctx) {
        throw new Error('context is not initialized');
    }
    return ctx;
};
