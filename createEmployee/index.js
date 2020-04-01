const neo4j = require('neo4j-driver');

module.exports = async function (context, req) {
    context.log('createEmployee received an HTTP request.');

    if (req.body) {
        const driver = neo4j.driver(process.env["NEO4J_URL"], neo4j.auth.basic(process.env["NEO4J_USERNAME"], process.env["NEO4J_PASSWORD"]));
        const session = driver.session();
        
        try {
            const result = await session.run(
                'MERGE (e:Employee {emp_id: $emp_id}) SET e.name=$name RETURN e',
                { emp_id: req.body.emp_id, name: req.body.name }
            );
            const createdNode = result.records[0];

            context.res = {
                status: 201,
                body: createdNode.toObject()
            };
        } 
        catch(error) {
            context.log(error)
            context.res = {
                status: 500,
                body: `An error occurred while creating employee : ${error.name} - ${error.code}`
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
            body: "Please pass an employee to create"
        };
    }
};