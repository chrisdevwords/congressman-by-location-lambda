
import mocha from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';
import request from 'request-promise-native';
import sinon from 'sinon';

import {
    setProPublicaKey,
    parseDistrictCode,
    getRepresentative,
    getSenators,
    getMembers
} from '../src/propublica';

const { beforeEach, afterEach, describe, it } = mocha;
const { expect, config } = chai;


config.includeStack = true;

describe('The ProPublica API Helper', () => {


    beforeEach((done) => {
        dotenv.config();
        const { PROPUBLICA_KEY } = process.env;
        setProPublicaKey(PROPUBLICA_KEY);
        done();
    });

    describe('#parseDistrictCode', () => {
        context('with a numeric district code', () => {
            it.skip('parses the number');
            it.skip('parses the state');
        });

        context('with an at large district code', () => {
           it.skip('parses the state');
           it.skip('parses the district');
        });
    });

    describe('#getRepresentative', () => {

        context('with a congressional code', () => {

            it.skip('gets a representative', (done) => {
                getRepresentative('AK-AL')
                    .then((result) => {
                        done(Error('Test not Complete'));
                    })
                    .catch(done)
            });
        });
    });

    describe('#getSenators', () => {

        it.skip('gets both senators by State', (done) => {
            getSenators('NY')
                .then((result) => {
                    //console.log(result);
                    done(Error('Test not Complete'));
                })
                .catch(done);
        });
    });

    describe('#getMembers', () => {
        context('with a district code', () => {
            it.skip('returns both senators');
            it.skip('returns the representative');

            context('for the 1st senator', () => {
                it.skip('parses the name', (done) => {
                    done(Error('Test not Complete'));
                });

                it.skip('parses the party', (done) => {
                    done(Error('Test not Complete'));
                });

                it.skip('parses the id', (done) => {
                    done(Error('Test not Complete'));
                });
            });

            context('for the 2nd senator', () => {
                it.skip('parses the name', (done) => {
                    done(Error('Test not Complete'));
                });

                it.skip('parses the party', (done) => {
                    done(Error('Test not Complete'));
                });

                it.skip('parses the id', (done) => {
                    done(Error('Test not Complete'));
                });
            });

            context('for the representative', () => {
                it.skip('parses the name', (done) => {
                    done(Error('Test not Complete'));
                });

                it.skip('parses the party', (done) => {
                    done(Error('Test not Complete'));
                });

                it.skip('parses the id', (done) => {
                    done(Error('Test not Complete'));
                });
            });
        });
    })
});
