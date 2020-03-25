module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var name = context.bindingData.name;

    if (name) {
        context.res = {
            status:200,
            body: `Updated cat with name ${name}`
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }

    context.done();
};