
import fs from 'fs';
import PATH from 'path';
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


const openMock = (options) => {

    const ROOT = '../';
    const segments = options.uri.split('/');
    const chamber = segments[6];

    let file;

    if (chamber === 'house') {
        const district = segments.slice(-2).shift();
        const st = segments.slice(-3).shift();
        file = `test/mock/propublica/members/house/${st}-${district}.json`;
    } else {
        const st = segments.slice(-2).shift();
        file = `test/mock/propublica/members/senate/${st}.json`;
    }

    const filePath = PATH.resolve(__dirname, ROOT, file);

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => {
            if(error) {
                reject(error);
            } else {
                resolve(JSON.parse(data.toString()));
            }
        });
    });
};

describe('The ProPublica API Helper', () => {


    beforeEach((done) => {
        dotenv.config();
        const { PROPUBLICA_KEY } = process.env;
        setProPublicaKey(PROPUBLICA_KEY);
        done();
    });

    describe('#parseDistrictCode', () => {
        context('with a numeric district code', () => {
            it('parses the number', (done) => {
                const { num } = parseDistrictCode('NY-02');
                expect(num).to.eq('02');
                done();
            });
            it('parses the state', (done) => {
                const { st } = parseDistrictCode('NY-12');
                expect(st).to.eq('NY');
                done();
            });
        });

        context('with an at large district code', () => {
           it('parses the state', (done) => {
                const { st } = parseDistrictCode('AK-AL');
                expect(st).to.eq('AK');
                done();
           });
           it('parses the district as 01', (done) => {
               const { num } = parseDistrictCode('AK-AL');
               expect(num).to.eq('01');
               done();
           });
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
