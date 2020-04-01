const neo4j = require('neo4j-driver');

module.exports = async function (context, req) {
    context.log('getEmployee received an HTTP request.');

    var emp_id = context.bindingData.emp_id;

    if(emp_id) {
        const driver = neo4j.driver(process.env["NEO4J_URL"], neo4j.auth.basic(process.env["NEO4J_USERNAME"], process.env["NEO4J_PASSWORD"]));
        const session = driver.session();

        try {
            const result = await session.run(
                'MATCH (e:Employee) WHERE e.emp_id=$emp_id RETURN e',
                { emp_id: emp_id }
            );
            const node = result.records[0];
    
            context.res = {
                status: 200,
                body: node.get(0)
            };
        }
        catch(error) {
            context.log(error)
            context.res = {
                status: 500,
                body: `An error occurred while getting employee : ${error.name} - ${error.code}`
            }
        }
        finally {
            await session.close()
            await driver.close()
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an employee emp_id on the query string"
        };
    }
};