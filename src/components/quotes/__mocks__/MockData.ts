export const films = [
    {
        id: 0,
        title: 'Scarface',
        quotes: [0, 5],
    },
    {
        id: 1,
        title: 'The Wizard of Oz',
        quotes: [1],
    },
];

export const quoteFromDb = {
    id: 5,
    actor: 'Al Pacino',
    quoteText: 'If you get all tangled up, just tango on.',
};

export const quotes = [quoteFromDb];

export const filmWithDeletedQuote = {
    id: 0,
    title: 'Scarface',
    quotes: [0],
};

export const filmWithAddedQuote = {
    id: 0,
    title: 'Scarface',
    quotes: [0, 5, 6],
};

export const newQuote = {
    id: 6,
    actor: 'Robert Loggia',
    quoteText:
        "You're gonna find, if you stay loyal in this business, you're gonna move up. You're gonna move up fast.",
};

export const updatedQuote = {
    id: 5,
    actor: 'Tony Montana',
    quoteText: 'You want to play games? Okay, I play with you.',
};

export const languages = [
    {
        id: 0,
        shortName: 'en',
        name: 'English',
    },
    {
        id: 1,
        shortName: 'fr',
        name: 'Francais',
    },
];