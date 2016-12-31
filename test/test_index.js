
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
        it.skip('finds a congressional district', (done) => {
            done(Error('test not complete'));
        });

        it.skip('sends 200', (done) => {
            done(Error('test not complete'));
        });
    });

    context('with a valid lat, lng outside the US', () => {
        it.skip('sends a 404', (done) => {
            done(Error('test not complete'));
        });
    });

    context('with an invalid lat, lng', () => {
        it.skip('sends a 400', (done) => {
            done(Error('test not complete'));
        });
    });
})
