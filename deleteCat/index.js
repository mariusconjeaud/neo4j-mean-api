module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var name = context.bindingData.name;

    if (name) {
        context.res = {
            status: 204
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a cat to delete"
        };
    }

    context.done();
};