
import request from 'request-promise-native';
import CustomError from './util/CustomError';

let _apiKey;

const API_ROOT = 'https://maps.googleapis.com/maps/api/place/';
const CAPITOL_HILL_LAT_LNG = '38.885391,-76.999354';


const OFFICE_SEARCH_ENDPOINT = (
    name,
    latLng = CAPITOL_HILL_LAT_LNG,
    radius = 5000
) => `${API_ROOT}nearbysearch/json` +
        `?location=${latLng}` +
        `&radius=${radius}` +
        `&key=${_apiKey}` +
        `&name=${encodeURI(`${name}`)}`;

const OFFICE_DETAIL_ENDPOINT = placeId =>
    `${API_ROOT}details/json` +
    `?placeid=${placeId}&key=${_apiKey}`;

export function setGoogleAPIKey(key) {
    _apiKey = key;
}

export const NO_OFFICES_FOUND = 'No offices found.';

export function findOffice(name) {

    const options = {
        // eslint-disable-next-line babel/new-cap
        uri: OFFICE_SEARCH_ENDPOINT(name),
        json:true
    };

    return request
        .get(options)
        .then(({ results }) => {
            if (!results || !results.length) {
                throw new CustomError(
                    NO_OFFICES_FOUND,
                    404
                );
            }
            return { placeId : results[0].place_id };
        });
}

export function getOfficeDetails(placeId) {
    const options = {
        // eslint-disable-next-line babel/new-cap
        uri: OFFICE_DETAIL_ENDPOINT(placeId),
        json: true
    };

    return request
        .get(options);
}

export function getPhoneNumber(name) {
    return findOffice(name)
        .then(({ placeId }) => getOfficeDetails(placeId))
        .then(({ result }) => {

            const { formatted_address, formatted_phone_number } = result;

            return {
                name,
                contact: {
                    address: formatted_address,
                    phone: formatted_phone_number
                }
            };
        });
}

export default {}
