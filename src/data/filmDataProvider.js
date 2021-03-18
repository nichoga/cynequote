export const filmDataProvider = {
    loadFilms: async (language) => {
        const res = await fetch(`/${language}/films`);
        const data = await res.json();
        return data;
    },
    addQuote: async ({ language, filmId, quote }) => {
        let res = await fetch(`${language}/quotes`, {
            method: 'POST',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const updatedQuote = await res.json();

        const quoteId = updatedQuote.id;

        res = await fetch(`${language}/films/${filmId}`);

        const film = await res.json();

        const updatedFilm = {
            ...film,
            quotes: [...film.quotes, quoteId],
        };

        res = await fetch(`${language}/films/${filmId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedFilm),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            film: await res.json(),
            quote: updatedQuote,
        };
    },
    loadQuotes: async (language) => {
        const res = await fetch(`/${language}/quotes`);
        return await res.json();
    },
    removeQuote: async({language, filmId, quoteId}) => {
        await fetch(`${language}/quotes/${quoteId}`, {
            method: 'DELETE',
        });

        let res = await fetch(`${language}/films/${filmId}`);

        const film = await res.json();

        const updatedFilm = {
            ...film,
            quotes: film.quotes.filter(x => x !== quoteId)
        }

        res = await fetch(`${language}/films/${film.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedFilm),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    },
    updateQuote: async({language, quote}) => {
        const res = await fetch(`${language}/quotes/${quote.id}`, {
            method: 'PUT',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    }
};