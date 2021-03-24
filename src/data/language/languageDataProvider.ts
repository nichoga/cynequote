import { Language } from '../models/Language'

export const languageDataProvider = {
    getLanguages: async () : Promise<Language[]> => {
        const res = await fetch('languages');
        const data = await res.json();
        return data;
    },
};


