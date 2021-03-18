import React from 'react';
import Preloader from '../layout/Preloader';
import FilmItem from './FilmItem';

const Films = ({ films, currentFilm, setCurrentFilm }) => {
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
                films.map((film) => (
                    <FilmItem
                        currentFilm={currentFilm}
                        onClick={() => setCurrentFilm(film)}
                        key={film.id}
                        film={film}
                    />
                ))
            )}
        </div>
    );
};

export default Films;
