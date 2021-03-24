import { useEffect, Fragment, FC } from 'react';
import { useLanguageContext } from '../../data/language/useLanguage';

const Navbar: FC = () => {
    const {
        currentLanguage,
        languages,
        setCurrentLanguage,
        getLanguages,
    } = useLanguageContext();

    useEffect(() => {
        getLanguages();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ul id="languagesDropdown" className="dropdown-content">
                {!languages ? (
                    <div>Loading...</div>
                ) : (
                    languages.map((lang) => (
                        <li key={lang.id}>
                            <a
                                href="#!"
                                onClick={() => setCurrentLanguage(lang)}
                                data-testid={
                                    `languageSelector_` + lang.shortName
                                }
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
                                data-testid="currentLanguage"
                            >
                                {!currentLanguage
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
