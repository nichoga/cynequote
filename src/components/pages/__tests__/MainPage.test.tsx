import { FC, ReactElement } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MainPage from '../MainPage';
import Navbar from '../../layout/Navbar';
import { FilmContextProvider } from '../../../data/film/useFilms';
import { filmDataProvider } from '../../../data/film/filmDataProvider';
import { LanguageContextProvider } from '../../../data/language/useLanguage';
import { languageDataProvider } from '../../../data/language/languageDataProvider';
import { languages, quotes, films } from '../__mocks__/MockData';

const Providers: FC = ({ children }) => {
    return (
        <LanguageContextProvider>
            <FilmContextProvider>{children}</FilmContextProvider>
        </LanguageContextProvider>
    );
};

const customRender = (ui: ReactElement, options?: any) =>
    render(ui, { wrapper: Providers, ...options });

const mockGetLanguages = (languageDataProvider.getLanguages = jest.fn());
const mockLoadFilms = (filmDataProvider.loadFilms = jest.fn());
const mockLoadQuotes = (filmDataProvider.loadQuotes = jest.fn());

beforeEach(async () => {
    mockGetLanguages.mockResolvedValueOnce(languages);
    mockLoadFilms.mockResolvedValueOnce(films);
    mockLoadQuotes.mockResolvedValueOnce(quotes);

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
        expect(mockLoadQuotes).toHaveBeenCalledWith('en');

        // films placeholder is not shown
        expect(screen.queryByText('No films to show...')).toBeNull();

        // films count is correct
        expect(screen.getAllByTestId(/film_/)).toHaveLength(films.length);

        films.forEach((film) => {
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
        const film = films[0];

        const filmEl = screen.getByTestId(`film_${film.id}`);

        fireEvent(
            filmEl,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(screen.queryByText('Select film to see quotes...')).toBeNull();

        expect(screen.getAllByTestId(/quote_/)).toHaveLength(
            film.quotes.length
        );

        film.quotes.forEach((q) => {
            const quote = quotes.find((x) => x.id === q);
            if (!quote) throw new Error('testing data is corrupt');

            expect(screen.getByText(quote.quoteText)).toBeInTheDocument();
        });
    });

    it('other quotes are loaded', async () => {
        const film0 = films[0];
        const film1 = films[1];

        const film0El = screen.getByTestId(`film_${film0.id}`);
        const film1El = screen.getByTestId(`film_${film1.id}`);

        fireEvent(
            film0El,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        film0.quotes.forEach((q) => {
            const quote = quotes.find((x) => x.id === q);
            if (!quote) throw new Error('testing data is corrupt');
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
            const quote = quotes.find((x) => x.id === q);
            if (!quote) throw new Error('testing data is corrupt');
            expect(screen.queryByText(quote.quoteText)).toBeNull();
        });

        film1.quotes.forEach((q) => {
            const quote = quotes.find((x) => x.id === q);
            if (!quote) throw new Error('testing data is corrupt');
            expect(screen.getByText(quote.quoteText)).toBeInTheDocument();
        });
    });
});
