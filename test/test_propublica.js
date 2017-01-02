
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
    REP_NOT_FOUND,
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

        beforeEach((done) => {
            sinon.stub(request, 'get', openMock);
            done();
        });

        afterEach((done) => {
            request.get.restore();
            done();
        });

        context('with a valid congressional code', () => {
            it('gets a representative', (done) => {
                getRepresentative('PA-01')
                    .then((rep) => {
                        expect(rep)
                            .to.be.an('object')
                            .and.not.be.an('undefined');
                        done();
                    })
                    .catch(done)
            });

            it('gets the name', (done) => {
                getRepresentative('PA-01')
                    .then(({ name }) => {
                        expect(name)
                            .to.be.an('string')
                            .and.to.eq('Robert A. Brady');
                        done();
                    })
                    .catch(done);
            });

            it('gets the party', (done) => {
                getRepresentative('PA-01')
                    .then(({ party }) => {
                        expect(party)
                            .to.be.an('string')
                            .and.to.eq('D');
                        done();
                    })
                    .catch(done);
            });

            it('gets the id', (done) => {
                getRepresentative('PA-01')
                    .then(({ id }) => {
                        expect(id)
                            .to.be.an('string')
                            .and.to.eq('B001227');
                        done();
                    })
                    .catch(done);
            });
        });

        context('with a non-existent congressional code', () => {
            it('throws a 404 for an error response', (done)=>{
                getRepresentative('WV-99')
                    .then(() => {
                        done(Error('Promise Should be Rejected'));
                    })
                    .catch(({ statusCode, message }) => {
                        expect(statusCode)
                            .to.eq(404);
                        expect(message)
                            .to.eq(REP_NOT_FOUND('WV-99'));
                        done();
                    });
            });

            it('throws a 404 for an empty results response', (done)=>{
                getRepresentative('NY-0')
                    .then(() => {
                        done(Error('Promise Should be Rejected'));
                    })
                    .catch(({ statusCode, message }) => {
                        expect(statusCode)
                            .to.eq(404);
                        expect(message)
                            .to.eq(REP_NOT_FOUND('NY-0'));
                        done();
                    });
            });
        });
    });

    describe('#getSenators', () => {

        context('with a state', () => {
            it.skip('gets both senators by State', (done) => {
                getSenators('NY')
                    .then(({ senators }) => {

                        //console.log(result);
                        done(Error('Test not Complete'));
                    })
                    .catch(done);
            });
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
