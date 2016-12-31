
import { getDistrictByLatLng } from 'congressional-district-finder';

function handler(event, context, callback) {

    const { queryStringParameters } = event;
    const { latLng } = queryStringParameters;
    const [lat, lng] = latLng.split(',');

    getDistrictByLatLng(lat, lng)
        .then(({ district }) => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(district),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        })
        .catch(({ statusCode = 500, message }) => {
            callback(null, {
                statusCode,
                body: JSON.stringify({ message })
            })
        });
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
