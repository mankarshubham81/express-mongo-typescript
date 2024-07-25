import { absolute } from '../sample';


test('should first test', () => {
    console.log("sample first test log");
})


test('absoulte - it should return a positive number if inout is positive', () => {
    const result = absolute(1);
    expect(result).toBe(1);
})

