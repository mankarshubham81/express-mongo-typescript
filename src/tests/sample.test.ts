import { absolute, greet } from '../sample';


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
})
