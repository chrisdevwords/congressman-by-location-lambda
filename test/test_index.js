
import mocha from 'mocha';
import chai from 'chai';
import request from 'request-promise-native';
import sinon from 'sinon';

import { handler } from '../src';

const { beforeEach, afterEach, describe, it } = mocha;
const { expect, config } = chai;

config.includeStack = true;

describe('The Index Lambda Handler', () => {

    context('with a valid lat, lng in the US', () => {

        const event = {
            queryStringParameters: {
                latLng: '40.7091106,-73.9462777'
            }
        };

        it('finds a congressional district', (done) => {

            handler(event, {}, (err, { body }) => {
                try {
                    const { district } = JSON.parse(body);
                    expect(district.districtCode)
                        .to.eq('NY-07');
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('sends a statusCode 200', (done) => {
            handler(event, {}, (err, { statusCode }) => {
                try {
                    expect(statusCode)
                        .to.eq(200);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });

    context('with a valid lat, lng outside the US', () => {

        const event = {
            queryStringParameters: {
                latLng: '42.318131, -82.999114'
            }
        };

        it('sends a statusCode 404', (done) => {
            handler(event, {}, (err, { statusCode }) => {
                try {
                    expect(statusCode)
                        .to.eq(404);
                    done();
                } catch(err) {
                    done(err);
                }
            });
        });
    });

    context('with an invalid lat, lng', () => {

        const event = {
            queryStringParameters: {
                latLng: 'fooobarrr'
            }
        };

        it('sends a statusCode 400', (done) => {
            handler(event, {}, (err, { statusCode }) => {
                try {
                    expect(statusCode)
                        .to.eq(400);
                    done();
                } catch(err) {
                    done(err);
                }
            });
        });
    });

    context('with no latLng in the qs', () => {

        const event = {
            queryStringParameters: {}
        };

        it('sends a statusCode 400', (done) => {
            handler(event, {}, ({ statusCode }) => {
                try {
                    expect(statusCode)
                        .to.eq(400);
                    done();
                } catch(err) {
                    done(err);
                }
            });
        });
    });
});
