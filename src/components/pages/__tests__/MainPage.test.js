import React, { Fragment } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MainPage from '../MainPage';
import Navbar from '../../layout/Navbar';
import { FilmContextProvider } from '../../../data/film/useFilms';
import { filmDataProvider } from '../../../data/film/filmDataProvider';
import { LanguageContextProvider } from '../../../data/language/useLanguage';
import { languageDataProvider } from '../../../data/language/languageDataProvider';
import * as db from '../../../../db.json';

const Providers = ({ children }) => {
    return (
        <LanguageContextProvider>
            <FilmContextProvider>{children}</FilmContextProvider>
        </LanguageContextProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Providers, ...options });

const mockGetLanguages = (languageDataProvider.getLanguages = jest.fn());
const mockLoadFilms = (filmDataProvider.loadFilms = jest.fn());
const mockLoadQuotes = (filmDataProvider.loadQuotes = jest.fn());

beforeEach(async () => {
    mockGetLanguages.mockResolvedValueOnce(db.languages);
    mockLoadFilms.mockResolvedValueOnce(db.films_en);
    mockLoadQuotes.mockResolvedValueOnce(db.quotes_en);

    await waitFor(() => {
        customRender(
            <div>
                <Navbar />
                <MainPage />
            </div>
        );
    });
});

describe('MainPage component', () => {
    it('films title is rendered', () => {
        expect(screen.getByText('Films')).toBeInTheDocument();

        // quotes placeholder is shown
        expect(
            screen.getByText('Select film to see quotes...')
        ).toBeInTheDocument();
    });

    it('films are loaded', async () => {
        expect(mockLoadFilms).toBeCalledTimes(1);
        expect(mockLoadFilms).toHaveBeenCalledWith('en');
        expect(mockLoadQuotes).toBeCalledTimes(1);
        expect(mockLoadQuotes).toHaveBeenCalledWith('en')

        // films placeholder is not shown
        expect(screen.queryByText('No films to show...')).toBeNull();

        // films count is correct
        expect(screen.getAllByTestId(/film_/)).toHaveLength(db.films_en.length);

        db.films_en.forEach((film) => {
            expect(screen.getByText(film.title)).toBeInTheDocument();
        });
    });

    it('film is selected', async () => {
        const filmId = 'film_0';

        const filmEl = screen.getByTestId(filmId);

        fireEvent(
            filmEl,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(filmEl.classList.contains('active')).toBeTruthy();
    });

    it('quotes are loaded', async () => {
        const filmId = 'film_0';

        const filmEl = screen.getByTestId(filmId);

        fireEvent(
            filmEl,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(screen.queryByText('Select film to see quotes...')).toBeNull();

        const film = db.films_en.find((x) => x.id === 0);

        expect(screen.getAllByTestId(/quote_/)).toHaveLength(
            film.quotes.length
        );

        film.quotes.forEach((q) => {
            const quote = db.quotes_en.find((x) => x.id === q);
            expect(screen.getByText(quote.quoteText)).toBeInTheDocument();
        });
    });

    it('other quotes are loaded', async () => {
        const film0Id = 'film_0';
        const film1Id = 'film_1'

        const film0El = screen.getByTestId(film0Id);
        const film1El = screen.getByTestId(film1Id);

        fireEvent(
            film0El,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        const film0 = db.films_en.find((x) => x.id === 0);

        film0.quotes.forEach((q) => {
            const quote = db.quotes_en.find((x) => x.id === q);
            expect(screen.getByText(quote.quoteText)).toBeInTheDocument();
        });

        fireEvent(
            film1El,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        film0.quotes.forEach((q) => {
            const quote = db.quotes_en.find((x) => x.id === q);
            expect(screen.queryByText(quote.quoteText)).toBeNull();
        });

        const film1 = db.films_en.find((x) => x.id === 1);

        film1.quotes.forEach((q) => {
            const quote = db.quotes_en.find((x) => x.id === q);
            expect(screen.getByText(quote.quoteText)).toBeInTheDocument();
        });
    });
});