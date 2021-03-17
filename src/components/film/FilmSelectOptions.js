import React, { useContext } from 'react';
import FilmContext from '../../context/film/FilmContext';

const FilmSelectOptions = () => {
    const filmContext = useContext(FilmContext);

    const { films } = filmContext;

    return (
        films !== null &&
        films.map((film) => (
            <option key={film.id} value={film.id}>
                {film.title}
            </option>
        ))
    );
};

export default FilmSelectOptions;
