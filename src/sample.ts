// Testing number
export const absolute = (number: number): number => {
    return number >= 0 ? number : -number;
};


// Testing String
export const greet = (name: string): string => {
    return 'Welcome ' + name;
};

// Testing arrays
export const getCurrencies = (): string[] => {
    return ['USD', 'AUD', 'EUR'];
};