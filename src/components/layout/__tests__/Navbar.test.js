import React from 'react';
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import Navbar from '../Navbar';
import { LanguageContextProvider } from '../../../data/language/useLanguage';
import { languageDataProvider } from '../../../data/language/languageDataProvider';
import * as db from '../../../../db.json';

const LanguageProvider = ({ children }) => {
    return <LanguageContextProvider>{children}</LanguageContextProvider>;
};

const customRender = (ui, options) =>
    render(ui, { wrapper: LanguageProvider, ...options });

const mockGetLanguages = (languageDataProvider.getLanguages = jest.fn());

beforeEach(async () => {
    mockGetLanguages.mockResolvedValueOnce(db.languages);

    await waitFor(() => {
        customRender(<Navbar />);
    });
});

describe('Navbar component', () => {
    it('renders title', () => {
        expect(mockGetLanguages).toBeCalledTimes(1);
        expect(screen.getByText('Cinequotes')).toBeInTheDocument();
    });
    
    it('current language is english', () => {
        expect(screen.getByTestId('languageSelector_en')).toHaveTextContent('English')
        expect(screen.getByTestId('languageSelector_fr')).toHaveTextContent('Francais')

        expect(screen.getByTestId('currentLanguage')).toHaveTextContent('English');
    });
    
    it('language is changed to Francais', () => {
        fireEvent(
            screen.getByTestId('currentLanguage'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );
    
        fireEvent(
            screen.getByTestId('languageSelector_fr'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );
    
        expect(screen.getByTestId('currentLanguage')).toHaveTextContent('Francais');
    });
})

