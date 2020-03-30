const swaggerDoc = require('../swagger.json');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: swaggerDoc
    };
};