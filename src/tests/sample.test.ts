import { absolute, greet, getCurrencies } from '../sample';


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
