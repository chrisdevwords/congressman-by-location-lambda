

import mocha from 'mocha';
import chai from 'chai';
import sinon from 'sinon';

import CustomError from '../../src/util/CustomError';

const { beforeEach, afterEach, describe, it } = mocha;
const { expect, config } = chai;


config.includeStack = true;

describe('CustomError', () => {

    context('by default', () => {
       it('has a statusCode of 500', (done) => {
           const err = new CustomError('Something bad.');
           expect(err.statusCode).to.eq(500);
           done();
       });
    });
});