
import { getDistrictByLatLng } from 'congressional-district-finder';

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

    if (!latLng) {

        const message = 'Must provide a query string value: "latLng", ' +
                        'a comma delimited set of coordinates.';
        callback(null, response({ message }, 400));

    } else {

        const [lat, lng] = latLng.split(',');

        getDistrictByLatLng(lat, lng)
            .then(({ district }) => {
                const { name, districtCode } = district;
                callback(null, response({
                    district: {
                        districtCode,
                        name
                    }
                }));
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
