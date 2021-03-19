export const languageDataProvider = {
    getLanguages: async () => {
        const res = await fetch('languages');
        const data = await res.json();
        return data;
    },
};
