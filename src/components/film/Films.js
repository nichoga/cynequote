import React, { useEffect, useContext } from 'react';
import Preloader from '../layout/Preloader';
import LanguageContext from '../../context/language/LanguageContext';
import FilmItem from './FilmItem';
import { useFilmsContext } from '../../data/useFilms';

const Films = ({ currentFilm, setCurrentFilm }) => {
    const languageContext = useContext(LanguageContext);

    const {
        films,
        loadFilms
    } = useFilmsContext()

    const { currentLanguage } = languageContext;

    useEffect(() => {
        if (!currentLanguage) {
            return
        }
        loadFilms()
    }, [currentLanguage]);

    if (!films) {
        return <Preloader />;
    }

    return (
        <div className="collection with-header">
            <div className="collection-header">
                <h4 className="center">Films</h4>
            </div>
            {!films.length ? (
                <p className="center">No films to show...</p>
            ) : (
                films.map((film) => <FilmItem
                    currentFilm={currentFilm}
                    setCurrentFilm={setCurrentFilm}
                    key={film.id}
                    film={film}
                />)
            )}
        </div>
    );
};

export default Films;
