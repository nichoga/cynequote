import React, { useContext, useEffect } from 'react';
import FilmContext from '../../context/film/FilmContext';
import PropTypes from 'prop-types';

const FilmItem = ({ film }) => {
    const filmContext = useContext(FilmContext);
    const { setCurrent, currentFilm } = filmContext;

    const onClick = () => {
        setCurrent(film);
    };

    return (
        <a
            className={
                'collection-item' +
                (currentFilm?.id === film.id ? ' active blue' : '')
            }
            onClick={onClick}
        >
            {film.title}
        </a>
    );
};

FilmItem.propTypes = {
    film: PropTypes.object.isRequired,
};

export default FilmItem;
