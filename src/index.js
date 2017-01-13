
import {
    getDistrictByLatLng,
    getDistrictByAddress
} from 'congressional-district-finder';
import { response } from './util/lambda';
import { getMembers, setProPublicaKey } from './propublica';


function handler(event, context, callback) {

    const { queryStringParameters } = event;
    const { latLng, address } = queryStringParameters || {};

    setProPublicaKey(process.env.PROPUBLICA_KEY);

    if (!latLng && !address) {

        const message = 'Must provide a query string value: "latLng", ' +
                        'a comma delimited set of coordinates,' +
                        ' or a query string value: "address".';
        callback(null, response({ message }, 400));

    } else {

        let getDistrict;

        if (address) {
            getDistrict = () => getDistrictByAddress(address);
        } else {
            const [lat, lng] = latLng.split(',');
            getDistrict = () => getDistrictByLatLng(lat, lng);
        }

        getDistrict()
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
