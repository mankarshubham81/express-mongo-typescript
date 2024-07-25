import { any } from 'joi';
import { absolute, greet, getCurrencies, getProducts, registerUser } from '../sample';


describe('absolute', () => {
    it('should first test', () => {
        console.log("sample first test log");
    })


    it('should return a positive number if inout is positive', () => {
        const result = absolute(1);
        expect(result).toBe(1);
    });

    it('should return a negative number if input is negative', () => {
        const result = absolute(-1);
        expect(result).toBe(1);
    });

    it('should return a -0 number if input is 0', () => {
        const result = absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return greeting message', () => {
        const result = greet('Shubham');
        expect(result).toMatch(/Shubham/);
        expect(result).toContain('Shubham');
    });
});

describe('getCurrencies', () => {
    it('should return supproting currencies', () => {
        const result = getCurrencies();
        // // Ways to test
        // // Too General - should be avoided
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();


        // // Too Specific - should be avoided
        // expect(result[0]).toBe('USD');
        // expect(result[1]).toBe('AUD');
        // expect(result[2]).toBe('EUR');
        // expect(result.length).toBe(3);

        // // Proper way - good way
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');

        // Ideal way - better way
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));

    });
});


describe('getProducts', () => {
    it('should return the product with the given id', () => {
        const result = getProducts(1);
        // // Ways to test

        // wrong matcher
        // wrong way - because it 
        // expect(result).toBe({ id: 1, price: 10 });

        // Too Specific - should be avoided
        // exact matcher 1 - i.e. it should have exactly all the key: value from original returned object
        // expect(result).toEqual({ id: 1, price: 10 });

        // Proper way - good way
        expect(result).toHaveProperty('id', 1);

        // Ideal way - better way
        // right matcher 2 - at leats this fileds should be present
        expect(result).toMatchObject({ id: 1, price: 10 });

    });
});


describe('registerUser', () => {
    it('should throw if Username is falsy', () => {
        // falsy values in javascript => 1) Null 2) undefined 3) NaN 4) '' 5) 0 6) false

        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { registerUser(a as unknown as string) }).toThrow();
        })
    });

    it('should return a user object if valid username is passed', () => {
        const result = registerUser('Shubham');
        expect(result).toMatchObject({ userName: 'Shubham' });
        expect(result.id).toBeGreaterThan(0)
    })
});


