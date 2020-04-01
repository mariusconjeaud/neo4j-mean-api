const neo4j = require('neo4j-driver');

module.exports = async function (context, req) {
    context.log('getAllEmployees received an HTTP request.');

    const driver = neo4j.driver(process.env["NEO4J_URL"], neo4j.auth.basic(process.env["NEO4J_USERNAME"], process.env["NEO4J_PASSWORD"]));
    const session = driver.session();
    
    try {
        const result = await session.run(
            'MATCH (e:Employee) RETURN e'
        );
        const nodes = result.records;

        context.res = {
            status: 200,
            body: nodes.map(node => node.get(0))
        };
    } 
    catch(error) {
        context.log(error)
        context.res = {
            status: 500,
            body: `An error occurred while getting employees : ${error.name} - ${error.code}`
        }
    }
    finally {
        await session.close()
        await driver.close()
    }
};