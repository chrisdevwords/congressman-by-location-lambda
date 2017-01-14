
import mocha from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';

import { handler } from '../src';

const { beforeEach, afterEach, describe, it } = mocha;
const { expect, config } = chai;

config.includeStack = true;

describe('The Index Lambda Handler', () => {

    beforeEach((done) => {
        dotenv.config({ silent: false });
        done();
    });

    context('with a valid lat, lng in the US', () => {

        const event = {
            queryStringParameters: {
                latLng: '40.7091106,-73.9462777'
            }
        };

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

        it('finds a congressional district', (done) => {

            handler(event, {}, (err, { body }) => {
                try {
                    const { result } = JSON.parse(body);
                    expect(result.district)
                        .to.eq('NY-07');
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('finds the members of congress', (done) => {
            handler(event, {}, (err, { body }) => {
                try {
                    const { result } = JSON.parse(body);
                    const { senators, representative } = result;
                    expect(senators)
                        .to.be.an('array')
                        .and.to.have.lengthOf(2);
                    expect(representative)
                        .to.be.an('object')
                        .and.to.include.keys('party', 'id', 'name');
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

    context('with a valid lat, lng in DC', () => {

        const event = {
            queryStringParameters: {
                latLng: '38.909418, -77.043235'
            }
        };

        it('sends a statusCode 404 and a snarky message', (done) => {
            handler(event, {}, (err, { statusCode, body }) => {
                try {

                    const { message } = JSON.parse(body);
                    expect(statusCode)
                        .to.eq(404);
                    expect(message)
                        .to.eq('Taxation without representation.');
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

    context('with null queryStringParameters', () => {

        const event = {
            queryStringParameters: null
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

    context('with an address in the US', () => {

        const event = {
            queryStringParameters: {
                address: '45 Main Street Brooklyn'
            }
        };

        it('finds a congressional district', (done) => {
            handler(event, {}, (err, { body }) => {
                try {
                    const { result } = JSON.parse(body);
                    expect(result.district)
                        .to.eq('NY-07');
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });
});
