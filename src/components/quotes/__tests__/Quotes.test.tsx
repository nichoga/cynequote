import React, { FC, ReactElement } from 'react';
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
import EditQuoteModal from '../EditQuoteModal';
import AddQuoteButton from '../../layout/AddQuoteButton';
import AddQuoteModal from '../AddQuoteModal';
import {
    films,
    quotes,
    updatedQuote,
    filmWithAddedQuote,
    filmWithDeletedQuote,
    newQuote,
    quoteFromDb,
    languages
} from '../__mocks__/MockData';

const Providers : FC = ({ children }) => {
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
const mockDeleteQuote = (filmDataProvider.removeQuote = jest.fn());
const mockEditQuote = (filmDataProvider.updateQuote = jest.fn());
const mockAddQuote = (filmDataProvider.addQuote = jest.fn());

beforeEach(async () => {
    mockGetLanguages.mockResolvedValueOnce(languages);
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

        const quotesList = screen.getByTestId('quotesList');

        expect(quotesList).not.toBeNull()

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

        const editQuoteModal = screen.getByTestId('edit-quote-modal');

        // edit quote modal is rendered
        expect(editQuoteModal).toBeInTheDocument();

        // quote text changed
        const quoteTextInput = getByLabelText(editQuoteModal, 'Quote Text') as HTMLInputElement;

        expect(quoteTextInput.value).toBe(quoteFromDb.quoteText);

        fireEvent.input(quoteTextInput, {
            target: { value: updatedQuote.quoteText },
        });

        expect(quoteTextInput.value).toBe(updatedQuote.quoteText);

        // quote actor changed
        const actorInput = getByLabelText(editQuoteModal, 'Actor') as HTMLInputElement;

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

        const addQuoteModal = screen.getByTestId('add-quote-modal');

        // add quote modal is rendered
        expect(addQuoteModal).toBeInTheDocument();

        // quote text changed
        const quoteTextInput = getByLabelText(addQuoteModal, 'Quote Text') as HTMLInputElement;

        expect(quoteTextInput.value).toBe('');

        fireEvent.input(quoteTextInput, {
            target: { value: newQuote.quoteText },
        });

        expect(quoteTextInput.value).toBe(newQuote.quoteText);

        // quote actor changed
        const actorInput = getByLabelText(addQuoteModal, 'Actor') as HTMLInputElement;

        expect(actorInput.value).toBe('');

        fireEvent.input(actorInput, {
            target: { value: newQuote.actor },
        });

        expect(actorInput.value).toBe(newQuote.actor);

        const filmSelector = getByTestId(addQuoteModal, 'addQuoteFilmSelector') as HTMLSelectElement;

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
        
        const quotesList = screen.getByTestId('quotesList');

        expect(quotesList).not.toBeNull()

        // quote is updated
        expect(getByText(quotesList, newQuote.quoteText)).toBeInTheDocument();
    });
});
