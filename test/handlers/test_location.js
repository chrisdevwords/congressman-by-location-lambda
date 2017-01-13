
import mocha from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';

import { handler } from '../../src/handlers/location';

const { beforeEach, afterEach, describe, it } = mocha;
const { expect, config } = chai;

config.includeStack = true;

describe('The Location Lambda Handler', () => {

    beforeEach((done) => {
        dotenv.config({ silent: true });
        done();
    });

    context('with a query string value: name for a member of congress', () => {

        const event = {
            queryStringParameters: {
                name: 'Charles Schumer'
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
    });

    context('without a query string value: name for a member of congress', () => {

        const event = {
            queryStringParameters: {
                name: ''
            }
        };

        it('sends a statusCode 400', (done) => {
            handler(event, {}, (err, { statusCode }) => {
                try {
                    expect(statusCode)
                        .to.eq(400);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });


});
