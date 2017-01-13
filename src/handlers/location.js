
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
        const message = `Coming soon. Phone number for ${name}`;
        callback(null, response({ message }));
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
