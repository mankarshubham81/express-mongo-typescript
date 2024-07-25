export const absolute = (number: number): number => {
    return number >= 0 ? number : -number;
};


export const greet = (name: string): string => {
    return 'Welcome ' + name;
};