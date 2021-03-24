import React, { useEffect, Fragment } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import AddQuoteButton from './components/layout/AddQuoteButton';
import EditQuoteModal from './components/quotes/EditQuoteModal';
import DeleteQuoteModal from './components/quotes/DeleteQuoteModal';
import AddQuoteModal from './components/quotes/AddQuoteModal';
import { FilmContextProvider } from './data/film/useFilms';
import { LanguageContextProvider } from './data/language/useLanguage';
import MainPage from './components/pages/MainPage';

const App = () => {
    useEffect(() => {
        M.AutoInit();
    }, []);

    return (
        <LanguageContextProvider>
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
        </LanguageContextProvider>
    );
};

export default App;
