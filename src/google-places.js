
import request from 'request-promise-native';
import CustomError from './util/CustomError';

let _apiKey;

const API_ROOT = 'https://maps.googleapis.com/maps/api/place/';
const CAPITOL_HILL_LAT_LNG = '38.885391,-76.999354';


const OFFICE_SEARCH_ENDPOINT = (name, latLng = CAPITOL_HILL_LAT_LNG, radius = 5000) =>
    API_ROOT +
    `nearbysearch/json?location=${latLng}` +
    `&radius=${radius}` +
    `&key=${_apiKey}` +
    `&name=${encodeURI(`${name}`)}`;

export function setGoogleAPIKey(key) {
    _apiKey = key;
}

export const NO_OFFICES_FOUND = 'No offices found.';

export function findOffice(name) {

    const options = {
        uri: OFFICE_SEARCH_ENDPOINT(name),
        json:true
    };

    console.log(options.uri);

    return request.get(options)
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

export function getPhoneNumber(name) {
    return findOffice(name);
}

export default {}
