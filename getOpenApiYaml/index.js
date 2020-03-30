const fs = require('fs'),
      path = require('path');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var yaml = fs.readFileSync(path.join(__dirname, '../open-api-definition.yml'), 'utf8');

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'text/yaml'
        },
        body: yaml
    };
};