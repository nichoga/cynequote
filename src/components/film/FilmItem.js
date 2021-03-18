import React from 'react';
import PropTypes from 'prop-types';

const FilmItem = ({ film, onClick, currentFilm }) => {

    return (
        <a href="!#"
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
