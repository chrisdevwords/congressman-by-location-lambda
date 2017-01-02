
import { getDistrictByLatLng } from 'congressional-district-finder';
import { getMembers, setProPublicaKey } from './propublica';


const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

function response(body, statusCode = 200, headers = DEFAULT_HEADERS) {
    return {
        statusCode,
        headers,
        body: JSON.stringify(
            Object.assign({ statusCode }, body)
        )
    }
}

function handler(event, context, callback) {

    const { queryStringParameters } = event;
    const { latLng } = queryStringParameters || {};

    setProPublicaKey(process.env.PROPUBLICA_KEY);

    if (!latLng) {

        const message = 'Must provide a query string value: "latLng", ' +
                        'a comma delimited set of coordinates.';
        callback(null, response({ message }, 400));

    } else {

        const [lat, lng] = latLng.split(',');

        getDistrictByLatLng(lat, lng)
            .then(({ district }) => getMembers(district.districtCode))
            .then((result) => {
                callback(null, response({ result }))
            })
            .catch(({ statusCode, message }) => {
                callback(null, response({ message }, statusCode))
            });
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
