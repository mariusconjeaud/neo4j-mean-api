module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {
        context.res = {
            status:201,
            body: `Created cat with name ${req.body.name}`
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a cat to create"
        };
    }
};