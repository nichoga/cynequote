import React from 'react';
import { useFilmsContext } from '../../data/useFilms';

const FilmSelectOptions = () => {

    const { films } = useFilmsContext;

    return (
        films &&
        films.map((film) => (
            <option key={film.id} value={film.id}>
                {film.title}
            </option>
        ))
    );
};

export default FilmSelectOptions;
