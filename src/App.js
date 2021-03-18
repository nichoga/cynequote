import React, { useEffect, Fragment } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import LanguageState from './context/language/LanguageState';
import FilmState from './context/film/FilmState';
import QuoteState from './context/quote/QuoteState';
import Navbar from './components/layout/Navbar';
import AddButton from './components/layout/AddButton';
import Films from './components/film/Films';
import Quotes from './components/quotes/Quotes';
import EditQuoteModal from './components/quotes/EditQuoteModal';
import DeleteQuoteModal from './components/quotes/DeleteQuoteModal';
import AddQuoteModal from './components/quotes/AddQuoteModal';
import { FilmContextProvider } from './data/useFilms';
import { MainPage } from './components/pages/MainPage';

const App = () => {
    useEffect(() => {
        M.AutoInit();
    });

    return (
        <LanguageState>
            <FilmContextProvider>
                <FilmState>
                    <QuoteState>
                        <Fragment>
                            <Navbar />
                            <div className="container">
                                <AddButton />
                                <EditQuoteModal />
                                <DeleteQuoteModal />
                                <AddQuoteModal />
                                <MainPage />
                            </div>
                        </Fragment>
                    </QuoteState>
                </FilmState>
            </FilmContextProvider>
        </LanguageState>
    );
};

export default App;
