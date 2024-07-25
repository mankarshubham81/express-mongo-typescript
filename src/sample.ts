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


// Testing Obescts
export const getProducts = (productId: number): {} => {
    return { id: productId, price: 10, category: 'a' };
};


// Testing Exceptions
interface User {
    id: number;
    userName: string;
}
export const registerUser = (userName: string): User => {

    if (!userName) throw new Error("Username is required");


    return { id: new Date().getTime(), userName: userName };
};

