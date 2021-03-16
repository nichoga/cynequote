import React, { useEffect, useContext } from 'react';
import LanguageContext from '../../context/language/LanguageContext';
import FilmContext from '../../context/film/FilmContext';

const FilmSelectOptions = () => {
    const languageContext = useContext(LanguageContext);
    const filmContext = useContext(FilmContext);

    const { films, getFilms } = filmContext;
    const { currentLanguage } = languageContext;

    useEffect(() => {
        if (currentLanguage !== null) {
            getFilms(currentLanguage.shortName);
        }
    }, [currentLanguage]);
    return (
        films !== null &&
        films.map((t) => (
            <option key={t.id} value={t.id}>
                {t.title}
            </option>
        ))
    );
};

export default FilmSelectOptions;
