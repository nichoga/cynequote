import React, { useEffect, useContext } from 'react';
import Preloader from '../layout/Preloader';
import LanguageContext from '../../context/language/LanguageContext';
import FilmContext from '../../context/film/FilmContext';
import FilmItem from './FilmItem';

const Films = () => {
    const languageContext = useContext(LanguageContext);
    const filmContext = useContext(FilmContext);

    const { films, getFilms } = filmContext;
    const { currentLanguage } = languageContext;

    useEffect(() => {
        if (currentLanguage !== null) {
            getFilms(currentLanguage.shortName);
        }
    }, [currentLanguage]);

    if (films === null) {
        return <Preloader />;
    }

    return (
        <div className="collection with-header">
            <div className="collection-header">
                <h4 className="center">Films</h4>
            </div>
            {films === null ? (
                <p className="center">No films to show...</p>
            ) : (
                films?.map((film) => <FilmItem key={film.id} film={film} />)
            )}
        </div>
    );
};

export default Films;
