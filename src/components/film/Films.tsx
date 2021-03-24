import React, { FC } from 'react';
import { Film } from '../../data/models/Film';
import Preloader from '../layout/Preloader';
import FilmItem from './FilmItem';

type Props = {
    films?: Film[],
    currentFilm?: Film,
    setCurrentFilm: (film: Film) => void
}

const Films : FC<Props> = ({ films, currentFilm, setCurrentFilm }) => {
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
