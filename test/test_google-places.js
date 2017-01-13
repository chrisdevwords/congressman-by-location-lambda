
import fs from 'fs';
import PATH from 'path';
import mocha from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';
import request from 'request-promise-native';
import sinon from 'sinon';

import {
    setGoogleAPIKey,
    findOffice,
    getPhoneNumber,
    NO_OFFICES_FOUND
} from '../src/google-places';

const { beforeEach, afterEach, describe, it } = mocha;
const { expect, config } = chai;

describe('The Google Places API Helper', () => {

    beforeEach((done) => {
        dotenv.config({ silent: true });
        const { GOOGLE_KEY } = process.env;
        setGoogleAPIKey(GOOGLE_KEY);
        done();
    });

    describe('#findOffice', () => {

        context('with the name of a senator', () => {
            it('fetches the place id', (done) => {
                findOffice('Mitch McConnel')
                    .then(({ placeId }) => {
                        expect(placeId).to.be.a('string');
                        expect(placeId).to.eq('ChIJVVWVKia4t4kRqwYnsukWfkw');
                        done();
                    })
                    .catch(done);
            });
        });

        context('with an empty result', () => {
            it('rejects the promise with a 404', (done) => {
                findOffice('Bo Jackson')
                    .then(() => {
                        done(Error('Promise Should be Rejected'));
                    })
                    .catch((err) => {
                        expect(err.message).to.eq(NO_OFFICES_FOUND);
                        expect(err.statusCode).to.eq(404);
                        done();
                    })
                    .catch(done);
            });
        });

    });

    describe('#getPhoneNumber', () => {
        context('with the name of a representative', () => {
            it('resolves with the phone number', (done) => {
                getPhoneNumber('Mike Doyle')
                    .then(({ contact }) => {
                        console.log(contact.phone);
                        expect(contact.phone).to.be.a('string');
                        done();
                    })
                    .catch(done);
            });
        })
    });

});

config.includeStack = true;
