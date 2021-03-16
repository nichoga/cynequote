import React, { useContext, useEffect, Fragment } from 'react';
import LanguageContext from '../../context/language/LanguageContext';
import QuoteContext from '../../context/quote/QuoteContext';

const Navbar = () => {
    const languageContext = useContext(LanguageContext);
    const quoteContext = useContext(QuoteContext);

    const {
        currentLanguage,
        setCurrentLanguage,
        getLanguages,
        languages,
    } = languageContext;

    useEffect(() => {
        getLanguages();
    }, []);

    const onSetCurrentLanguage = (lang) => {
        setCurrentLanguage(lang);
    };

    return (
        <Fragment>
            <ul id="languagesDropdown" className="dropdown-content">
                {languages === null ? (
                    <div>Loading...</div>
                ) : (
                    languages.map((lang) => (
                        <li key={lang.id}>
                            <a
                                href="#!"
                                onClick={() => setCurrentLanguage(lang)}
                            >
                                {lang.name}
                            </a>
                        </li>
                    ))
                )}
            </ul>
            <nav>
                <div className="nav-wrapper blue">
                    <a href="#!" className="brand-logo center">
                        Cinequotes
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a
                                className="dropdown-trigger"
                                href="#!"
                                data-target="languagesDropdown"
                            >
                                {currentLanguage === null
                                    ? 'not set'
                                    : currentLanguage.name}
                                <i className="material-icons right">
                                    arrow_drop_down
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;
