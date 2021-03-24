import { FC } from 'react';
import { Film } from '../../data/models/Film';

type Props = {
    film: Film,
    currentFilm?: Film,
    onClick: () => void
}

const FilmItem : FC<Props> = ({ film, onClick, currentFilm }) => {

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

export default FilmItem;
