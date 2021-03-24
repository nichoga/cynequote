import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from 'react';
import { languageDataProvider } from './languageDataProvider';
import { Language } from '../models/Language';

interface IUseLanguage {
    languages: Language[];
    currentLanguage: Language | undefined;
    setCurrentLanguage: Dispatch<SetStateAction<Language | undefined>>;
    getLanguages: () => Promise<void>;
}

const useLanguage = (): IUseLanguage => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<Language>();

    const getLanguages = useCallback(async () => {
        try {
            const result = await languageDataProvider.getLanguages();

            setLanguages(result);

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

const LanguageContext = createContext<IUseLanguage | undefined>(undefined);

export const LanguageContextProvider: FC = ({ children }) => {
    const langProps = useLanguage();

    return (
        <LanguageContext.Provider value={langProps}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('context is not initialized');
    }
    return ctx;
};
