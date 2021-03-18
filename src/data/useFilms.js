import { createContext, useCallback, useContext, useState } from "react"
import LanguageContext from '../context/language/LanguageContext'

const useFilms = () => {
    const { currentLanguage } = useContext(LanguageContext)

    const [films, setFilms] = useState([])

    const addQuoute = useCallback(({ filmId, quoute }) => {

    }, [])

    const removeQuoute = useCallback(({ }) => {

    }, [])

    const loadFilms = useCallback(async () => {
        setFilms(await dataProvider.loadFilms(currentLanguage.shortName))
    }, [currentLanguage])

    return {
        films,
        addQuoute,
        removeQuoute,
        loadFilms
    }

}

//The BFF with db
const dataProvider = {
    loadFilms: async (language) => {
        const res = await fetch(`/${language}/films`);
        const data = await res.json();
        return data;
    }
}

const FilmContext = createContext();

export const FilmContextProvider = ({ children }) => {

    const filmsProps = useFilms();

    return (<FilmContext.Provider value={filmsProps}>
        {children}
    </FilmContext.Provider>)
}

export const useFilmsContext = () => {
    return useContext(FilmContext)
}