export const filmDataProvider = {
    addQuote: async ({ language, filmId, quote }) => {

        let res = await fetch(`${language}/quotes`, {
            method: 'POST',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const quote = await res.json();

        const quoteId = quote.id;

        res = await fetch(`${language}/films/${filmId}`)

        const film = await res.json()

        const updatedFilm = {
            ...film,
            quotes: [
                ...film.quotes,
                quoteId
            ]
        }

        res = await fetch(`${language}/films/${filmId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedFilm),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            film: await res.json(),
            quote
        }
    }
}