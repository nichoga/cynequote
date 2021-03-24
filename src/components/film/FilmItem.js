import React from 'react';
import PropTypes from 'prop-types';

const FilmItem = ({ film, onClick, currentFilm }) => {

    return (
        <div
            className={
                'collection-item' +
                (currentFilm?.id === film.id ? ' active blue' : '')
            }
            data-testid={`film_${film.id}`}
            onClick={onClick}
        >
            {film.title}
        </div>
    );
};

FilmItem.propTypes = {
    film: PropTypes.object.isRequired,
};

export default FilmItem;
