export const addQuote = ({ language, filmId, updatedFilm }) => {
    await fetch(`${language}/films/${filmId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFilm),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


