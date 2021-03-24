import React from 'react';
import {
    act,
    fireEvent,
    getByLabelText,
    getByTestId,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import MainPage from '../../pages/MainPage';
import Navbar from '../../layout/Navbar';
import DeleteQuoteModal from '../DeleteQuoteModal';
import { FilmContextProvider } from '../../../data/film/useFilms';
import { filmDataProvider } from '../../../data/film/filmDataProvider';
import { LanguageContextProvider } from '../../../data/language/useLanguage';
import { languageDataProvider } from '../../../data/language/languageDataProvider';
import * as db from '../../../../db.json';
import EditQuoteModal from '../EditQuoteModal';
import AddQuoteButton from '../../layout/AddQuoteButton';
import AddQuoteModal from '../AddQuoteModal';

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
const mockDeleteQuote = (filmDataProvider.removeQuote = jest.fn());
const mockEditQuote = (filmDataProvider.updateQuote = jest.fn());
const mockAddQuote = (filmDataProvider.addQuote = jest.fn());

const films = [
    {
        id: 0,
        title: 'Scarface',
        quotes: [0, 5],
    },
    {
        id: 1,
        title: 'The Wizard of Oz',
        quotes: [1],
    },
];

const quoteFromDb = {
    id: 5,
    actor: 'Al Pacino',
    quoteText: 'If you get all tangled up, just tango on.',
};

const quotes = [quoteFromDb];

const filmWithDeletedQuote = {
    id: 0,
    title: 'Scarface',
    quotes: [0],
};

const filmWithAddedQuote = {
    id: 0,
    title: 'Scarface',
    quotes: [0, 5, 6],
};

const newQuote = {
    id: 6,
    actor: 'Robert Loggia',
    quoteText:
        "You're gonna find, if you stay loyal in this business, you're gonna move up. You're gonna move up fast.",
};

const updatedQuote = {
    id: 5,
    actor: 'Tony Montana',
    quoteText: 'You want to play games? Okay, I play with you.',
};

beforeEach(async () => {
    mockGetLanguages.mockResolvedValueOnce(db.languages);
    mockLoadFilms.mockResolvedValueOnce(films);

    mockDeleteQuote.mockResolvedValueOnce(filmWithDeletedQuote);
    mockLoadQuotes.mockResolvedValueOnce(quotes);
    mockEditQuote.mockResolvedValueOnce(updatedQuote);
    mockAddQuote.mockResolvedValueOnce({
        film: filmWithAddedQuote,
        quote: newQuote,
    });
});

describe('quotes editing modals', () => {
    it('deletes quote', async () => {
        await waitFor(() => {
            customRender(
                <div>
                    <Navbar />
                    <div className="container">
                        <DeleteQuoteModal />
                        <MainPage />
                    </div>
                </div>
            );
        });

        const quoteText = 'If you get all tangled up, just tango on.';

        // select film
        fireEvent(
            screen.getByTestId('film_0'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        // quote is on page
        expect(screen.getByText(quoteText)).toBeInTheDocument();

        // click on delete button
        fireEvent(
            screen.getByTestId('deleteQuote_5'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        // check if confirmation popup opened
        expect(
            screen.getByText('Are you sure you want to delete a quote?')
        ).toBeInTheDocument();

        // click on "No" button
        fireEvent(
            screen.getByTestId('deleteQuoteCancel'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        // quote is still on page
        expect(screen.getByText(quoteText)).toBeInTheDocument();

        // click on delete button
        fireEvent(
            screen.getByTestId('deleteQuote_5'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        await act(async () => {
            // click on "Yes" button
            fireEvent(
                screen.getByTestId('deleteQuoteSubmit'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                })
            );
        });

        expect(mockDeleteQuote).toBeCalledTimes(1);
        expect(mockDeleteQuote).toHaveBeenCalledWith({
            language: 'en',
            filmId: 0,
            quoteId: 5,
        });

        // toast shown
        expect(screen.getByText('Quote deleted')).toBeInTheDocument();

        // quote is removed
        expect(screen.queryByText(quoteText)).toBeNull();
    });

    it('edits the quote', async () => {
        await waitFor(() => {
            customRender(
                <div>
                    <Navbar />
                    <div className="container">
                        <EditQuoteModal />
                        <MainPage />
                    </div>
                </div>
            );
        });

        // select film
        fireEvent(
            screen.getByTestId('film_0'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        const quotesList = document.querySelector('#quotesList');

        // quote is on page
        expect(
            getByText(quotesList, quoteFromDb.quoteText)
        ).toBeInTheDocument();

        // click on delete button
        fireEvent(
            screen.getByTestId('editQuote_5'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(screen.getByText('Save quote')).toBeInTheDocument();

        const editQuoteModal = document.querySelector('#edit-quote-modal');

        // quote text changed
        const quoteTextInput = getByLabelText(editQuoteModal, 'Quote Text');

        expect(quoteTextInput.value).toBe(quoteFromDb.quoteText);

        fireEvent.input(quoteTextInput, {
            target: { value: updatedQuote.quoteText },
        });

        expect(quoteTextInput.value).toBe(updatedQuote.quoteText);

        // quote actor changed
        const actorInput = getByLabelText(editQuoteModal, 'Actor');

        expect(actorInput.value).toBe(quoteFromDb.actor);

        fireEvent.input(actorInput, {
            target: { value: updatedQuote.actor },
        });

        expect(actorInput.value).toBe(updatedQuote.actor);

        await act(async () => {
            // click on "Submit" button
            fireEvent(
                screen.getByTestId('editQuoteSubmit'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                })
            );
        });

        expect(mockEditQuote).toBeCalledTimes(1);
        expect(mockEditQuote).toHaveBeenCalledWith({
            language: 'en',
            quote: updatedQuote,
        });

        // toast shown
        expect(screen.getByText('Quote updated')).toBeInTheDocument();

        // quote is updated
        expect(
            getByText(quotesList, updatedQuote.quoteText)
        ).toBeInTheDocument();
    });

    it('adds the quote', async () => {
        await waitFor(() => {
            customRender(
                <div>
                    <Navbar />
                    <div className="container">
                        <AddQuoteButton />
                        <AddQuoteModal />
                        <MainPage />
                    </div>
                </div>
            );
        });

        // select film
        fireEvent(
            screen.getByTestId('film_0'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        // add button is visible
        expect(screen.getByTestId('addQuoteButton')).toBeInTheDocument();

        // press add button
        fireEvent(
            screen.getByTestId('addQuoteButton'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        const addQuoteModal = document.querySelector('#add-quote-modal');

        // quote text changed
        const quoteTextInput = getByLabelText(addQuoteModal, 'Quote Text');

        expect(quoteTextInput.value).toBe('');

        fireEvent.input(quoteTextInput, {
            target: { value: newQuote.quoteText },
        });

        expect(quoteTextInput.value).toBe(newQuote.quoteText);

        // quote actor changed
        const actorInput = getByLabelText(addQuoteModal, 'Actor');

        expect(actorInput.value).toBe('');

        fireEvent.input(actorInput, {
            target: { value: newQuote.actor },
        });

        expect(actorInput.value).toBe(newQuote.actor);

        const filmSelector = getByTestId(addQuoteModal, 'addQuoteFilmSelector');

        expect(filmSelector.value).toBe('');

        const filmId = '0';
        fireEvent.change(filmSelector, { target: { value: filmId } });

        expect(filmSelector.value).toBe(filmId);

        await act(async () => {
            // click on "Submit" button
            fireEvent(
                screen.getByTestId('addQuoteSubmit'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                })
            );
        });

        expect(mockAddQuote).toBeCalledTimes(1);
        expect(mockAddQuote).toHaveBeenCalledWith({
            filmId: filmId,
            language: 'en',
            quote: {
                actor: newQuote.actor,
                quoteText: newQuote.quoteText,
            },
        });

        // toast shown
        expect(screen.getByText('Quote created')).toBeInTheDocument();
        const quotesList = document.querySelector('#quotesList');

        
        // quote is updated
        expect(getByText(quotesList, newQuote.quoteText)).toBeInTheDocument();
    });
});
