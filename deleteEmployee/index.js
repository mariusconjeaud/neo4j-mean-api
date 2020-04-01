const neo4j = require('neo4j-driver');

module.exports = async function (context, req) {
    context.log('deleteEmployee received an HTTP request.');

    var emp_id = context.bindingData.emp_id;

    if(emp_id) {
        const driver = neo4j.driver(process.env["NEO4J_URL"], neo4j.auth.basic(process.env["NEO4J_USERNAME"], process.env["NEO4J_PASSWORD"]));
        const session = driver.session();

        try {
            await session.run(
                'MATCH (e:Employee) WHERE e.emp_id=$emp_id DETACH DELETE e',
                { emp_id: emp_id }
            );
            context.res = {
                status: 200,
                body: `Successfully deleted Employee with id ${emp_id}`
            };
        }
        catch(error) {
            context.log(error)
            context.res = {
                status: 500,
                body: `An error occurred while deleting employee : ${error.name} - ${error.code}`
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
            body: "Please pass an employee to delete"
        };
    }
};