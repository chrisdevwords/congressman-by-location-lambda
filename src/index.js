
import {
    getDistrictByLatLng,
    getDistrictByAddress,
    DISTRICT_NOT_FOUND
} from 'congressional-district-finder';
import { response } from './util/lambda';
import { getMembers, setProPublicaKey } from './propublica';

const NO_VOTE_404 = [
    // eslint-disable babel/new-cap
    DISTRICT_NOT_FOUfND('DC-0'),
    DISTRICT_NOT_FOUND('PR-0')
    // eslint-enable babel/new-cap
];

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
                if (statusCode === 404 && NO_VOTE_404.includes(message)) {
                    callback(null, response({ message:
                        'Taxation without representation.'
                    }, 404))

                } else {
                    callback(null, response({ message }, statusCode));

                 }
            });
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    handler
}
