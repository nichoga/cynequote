import { Film } from '../models/Film';
import { Quote } from '../models/Quote';

export const filmDataProvider = {
    loadFilms: async (language: string): Promise<Film[]> => {
        const res = await fetch(`/${language}/films`);
        const data = await res.json();
        return data;
    },
    addQuote: async ({
        language,
        filmId,
        quote,
    }: {
        language: string;
        filmId: string;
        quote: Quote;
    }): Promise<{ film: Film; quote: Quote }> => {
        let res = await fetch(`${language}/quotes`, {
            method: 'POST',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const newQuote = await res.json();

        const quoteId = newQuote.id;

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
            quote: newQuote,
        };
    },
    loadQuotes: async (language: string): Promise<Quote[]> => {
        const res = await fetch(`/${language}/quotes`);
        return await res.json();
    },
    removeQuote: async ({
        language,
        filmId,
        quoteId,
    }: {
        language: string;
        filmId: number;
        quoteId: number;
    }): Promise<Film> => {
        await fetch(`${language}/quotes/${quoteId}`, {
            method: 'DELETE',
        });

        let res = await fetch(`${language}/films/${filmId}`);

        const film: Film = await res.json();

        const updatedFilm = {
            ...film,
            quotes: film.quotes.filter((x) => x !== quoteId),
        };

        res = await fetch(`${language}/films/${film.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedFilm),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    },
    updateQuote: async ({
        language,
        quote,
    }: {
        language: string;
        quote: Quote;
    }): Promise<Quote> => {
        const res = await fetch(`${language}/quotes/${quote.id}`, {
            method: 'PUT',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    },
};
