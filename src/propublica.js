
import request from 'request-promise-native';
import CustomError from './util/CustomError';


let _apiKey;

const API_ROOT = 'https://api.propublica.org/congress/v1/members/';

export const REP_NOT_FOUND = district =>
    `Representative not found for district: "${district}".`;

export const HOUSE_ENDPOINT = (st, district) =>
    `${API_ROOT}house/${st}/${district}/current.json`;

export const SENATE_ENDPOINT = st =>
    `${API_ROOT}/senate/${st}/current.json`;

export function setProPublicaKey(key) {
    _apiKey = key;
}

export function getHeaders() {
    return {
        'X-API-Key': _apiKey
    }
}

export function parseDistrictCode(code) {
    const [st, district] = code.split('-');
    const num = district === 'AL' ? '01' : district;
    return { num, st, code }
}

export function getRepresentative(district) {

    const { num, st } = parseDistrictCode(district);
    const options = {
        // eslint-disable-next-line babel/new-cap
        uri: HOUSE_ENDPOINT(st, num),
        headers: getHeaders(),
        json: true
    };

    return request.get(options)
        .then(({ results }) => {
            if (results && results.length) {
                return results.shift();
            }
            // eslint-disable-next-line babel/new-cap
            throw new CustomError(REP_NOT_FOUND(district), 404);
        });
}

export function getSenators(st) {
    const options = {
        // eslint-disable-next-line babel/new-cap
        uri: SENATE_ENDPOINT(st),
        headers: getHeaders()
    };
    return request.get(options);
}

export function getMembers(districtCode) {

    const { st } = parseDistrictCode(districtCode);
    return Promise.all([
        getRepresentative(districtCode),
        getSenators(st)
    ]).then(([house, senate]) => ({
        state: st,
        districtCode,
        house,
        senate
    }));
}
