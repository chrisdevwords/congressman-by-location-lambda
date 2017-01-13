
import { response } from '../util/lambda';


function handler(event, context, callback) {

    const { queryStringParameters } = event;
    const { name } = queryStringParameters;

    if (!name) {

        const message = 'Must provide a query string value: "name", ' +
            'the name of the member of Congress you wish to contact.".';
        callback(null, response({ message }, 400));
    } else {
        const message = `Coming soon. Phone number for ${name}`;
        callback(null, response({ message }));
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
