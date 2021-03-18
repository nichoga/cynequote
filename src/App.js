import React, { useEffect, Fragment } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import LanguageState from './context/language/LanguageState';
import Navbar from './components/layout/Navbar';
import AddQuoteButton from './components/layout/AddQuoteButton';
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
                <Fragment>
                    <Navbar />
                    <div className="container">
                        <AddQuoteButton />
                        <EditQuoteModal />
                        <DeleteQuoteModal />
                        <AddQuoteModal />
                        <MainPage />
                    </div>
                </Fragment>
            </FilmContextProvider>
        </LanguageState>
    );
};

export default App;
