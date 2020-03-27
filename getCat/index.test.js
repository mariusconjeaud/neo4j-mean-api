const httpFunction = require('./index');
const context = require('../testing/defaultContext')

describe('API', () => {
    it('#getCat should return known cat', async () => {
        const request = {};
        context.bindingData.name = 'lucy';

        await httpFunction(context, request);

        expect(context.log.mock.calls.length).toBe(1);
        expect(context.res.body).toEqual({ name: 'lucy' });
    });
    it('#getCat should return 400 if missing name', async () => {
        const request = {};
        context.bindingData.name = null;

        await httpFunction(context, request);

        expect(context.res.status).toEqual(400);
        expect(context.res.body).toEqual("Please pass a name on the query string");
    });
});