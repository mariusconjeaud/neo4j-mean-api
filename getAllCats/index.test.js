const httpFunction = require('./index');
const context = require('../testing/defaultContext')

describe('API', () => {
    it('#getAllCats should return known objects', async () => {
        const request = {};

    await httpFunction(context, request);

    expect(context.log.mock.calls.length).toBe(1);
    expect(context.res.body).toEqual([{ name: 'lilly' }, { name: 'lucy' }]);
    });
});