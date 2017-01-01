
import { getDistrictByLatLng } from 'congressional-district-finder';

function handler(event, context, callback) {

    const { queryStringParameters } = event;
    const { latLng } = queryStringParameters || {};

    if (!latLng) {
        const statusCode = 400;
        const message = 'Must provide a query string value: "latLng", ' +
                        'a comma delimited set of coordinates.';
        callback({
            statusCode,
            body: JSON.stringify({
                statusCode,
                message
            })
        });
    }

    const [lat, lng] = latLng.split(',');

    getDistrictByLatLng(lat, lng)
        .then(({ district }) => {

            const { name, districtCode } = district;
            const statusCode = 200;

            callback(null, {
                statusCode,
                body: JSON.stringify({
                    statusCode,
                    district: {
                        districtCode,
                        name
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        })
        .catch(({ statusCode = 500, message }) => {
            callback(null, {
                statusCode,
                body: JSON.stringify({ message, statusCode })
            })
        });
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
