
import { response } from '../util/lambda';
import { getPhoneNumber, setGoogleAPIKey } from '../google-places';

function handler(event, context, callback) {

    const { queryStringParameters } = event;
    const { name } = queryStringParameters;

    setGoogleAPIKey(process.env.GOOGLE_KEY);

    if (!name) {

        const message = 'Must provide a query string value: "name", ' +
            'the name of the member of Congress you wish to contact.".';
        callback(null, response({ message }, 400));
    } else {
        getPhoneNumber(name)
            .then(data => {
                callback(null, response(data));
            })
            .catch(({ statusCode, message }) => {
                callback(null, response({ message }, statusCode));
            });
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
