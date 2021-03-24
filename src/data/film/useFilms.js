import { createContext, useCallback, useContext, useState } from 'react';
import { filmDataProvider } from './filmDataProvider';
import { useLanguageContext } from '../language/useLanguage';

const useFilms = () => {
    const { currentLanguage } = useLanguageContext();

    const [films, setFilms] = useState();
    const [quotes, setQuotes] = useState();
    const [currentFilm, setCurrentFilm] = useState();
    const [currentQuote, setCurrentQuote] = useState();

    const lang = currentLanguage?.shortName;

    const addQuote = useCallback(
        async (filmId, quote) => {
            const { quote: newQuoute, film } = await filmDataProvider.addQuote({
                language: lang,
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
            language: lang,
            filmId: currentFilm.id,
            quoteId: currentQuote.id,
        });

        setQuotes((prevQuotes) => {
            return prevQuotes.filter((x) => x.id !== currentQuote.id);
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
                language: lang,
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

const FilmContext = createContext();

export const FilmContextProvider = ({ children }) => {
    const filmsProps = useFilms();

    return (
        <FilmContext.Provider value={filmsProps}>
            {children}
        </FilmContext.Provider>
    );
};

export const useFilmsContext = () => {
    return useContext(FilmContext);
};
