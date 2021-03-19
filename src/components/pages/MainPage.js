import { useEffect, useMemo } from 'react';
import Films from '../film/Films';
import Quotes from '../quotes/Quotes';
import { useFilmsContext } from '../../data/film/useFilms';
import { useLanguageContext } from '../../data/language/useLanguage';

export const MainPage = () => {
    const {
        films,
        init,
        quotes,
        currentFilm,
        setCurrentFilm,
        setCurrentQuote,
    } = useFilmsContext();

    const { currentLanguage } = useLanguageContext();

    useEffect(() => {
        if (!currentLanguage) {
            return;
        }
        init();
    }, [currentLanguage, init]);

    const currentQuotes = useMemo(() => {
        if (!currentFilm || !quotes) {
            return;
        }

        return quotes.filter((a) => currentFilm.quotes.indexOf(a.id) !== -1);
    }, [currentFilm, quotes]);

    return (
        <div className="row">
            <div className="col s6">
                <Films
                    films={films}
                    currentFilm={currentFilm}
                    setCurrentFilm={setCurrentFilm}
                />
            </div>
            <div className="col s6">
                {!currentFilm || !currentQuotes ? (
                    <p className="center">Select film to see quotes...</p>
                ) : (
                    <Quotes
                        quotes={currentQuotes}
                        setCurrent={setCurrentQuote}
                    />
                )}
            </div>
        </div>
    );
};
