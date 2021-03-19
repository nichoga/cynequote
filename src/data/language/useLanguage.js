import { createContext, useCallback, useContext, useState } from 'react';
import { languageDataProvider } from './languageDataProvider'

const useLanguage = () => {
    const [languages, setLanguages] = useState();
    const [currentLanguage, setCurrentLanguage] = useState();

    const getLanguages = useCallback(async () => {
        try {
            const result = await languageDataProvider.getLanguages();

            setLanguages(result)

            setCurrentLanguage(result[0]);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return {
        languages,
        currentLanguage,
        setCurrentLanguage,
        getLanguages,
    };
};

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
    const langProps = useLanguage();

    return (
        <LanguageContext.Provider value={langProps}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => {
    return useContext(LanguageContext);
};
