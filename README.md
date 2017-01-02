Congressman by Location for AWS Lambda
========================================
Simple lambda function for a microservice that finds your members of Congress by Lat, Lng coordinates or address. 

[![CircleCI](https://circleci.com/gh/chrisdevwords/congressman-by-location-lambda/tree/master.svg?style=shield&nocache=1)](https://circleci.com/gh/chrisdevwords/congressman-by-location-lambda/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/chrisdevwords/congressman-by-location-lambda/badge.svg?branch=master&nocache=1)](https://coveralls.io/github/chrisdevwords/congressman-by-location-lambda?branch=master)
[![Dependency Status](https://david-dm.org/chrisdevwords/congressman-by-location-lambda.svg)](https://david-dm.org/chrisdevwords/congressman-by-location-lambda)
[![Dev Dependency Status](https://david-dm.org/chrisdevwords/congressman-by-location-lambda/dev-status.svg)](https://david-dm.org/chrisdevwords/congressman-by-location-lambda?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/chrisdevwords/congressman-by-location-lambda/badge.svg)](https://snyk.io/test/github/chrisdevwords/congressman-by-location-lambda)

Uses [congressional-district-finder](https://github.com/chrisdevwords/congressional-district-finder) to find the district by latitude and longitude.

Fetches names and basic information about members of Congress from the [ProPublica API](https://propublica.github.io/congress-api-docs/).

Requirements
------------
* Requires Node v4.3.2 
* Package engine is set to strict to match [AWS Lambda Environment](https://aws.amazon.com/blogs/compute/node-js-4-3-2-runtime-now-available-on-lambda/)
* I recommend using [NVM](https://github.com/creationix/nvm)

### ProPublica API Key
In order to run tests for the index handler in your local environment you will need to configure your own ProPublica API Key:
- [Request an API Key](apihelp@propublica.org) from [ProPublica](https://propublica.github.io/congress-api-docs/).
- Save this key (assuming the value is ABC123) to an .env file in the root of this repo:
```
$ echo PROPUBLICA_KEY=ABC123 > .env
```
You will also need to set the environmental key: "PROPUBLICA_KEY" to any AWS Lambda instances or CI tools that run the tests.

## Running Tests
This project includes [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/). If you add to this, write more tests. And run them:
````
$ npm test
````
NOTE: Before running the tests, please read [how to configure your API Keys](#propublica-api-key)

### Contributing
All code is transpiled from ES6 with Babel. The lint config is based on [AirBnB's eslint](https://www.npmjs.com/package/eslint-config-airbnb).
To lint the code run:
```
$ npm run lint
```

###Compiling For Upload
Make sure the bin directory has executable permissions:
````
$ chmod +x ./bin/build.sh
````
If this throws an error, trying using sudo:
```
$ sudo chmod +x .bin/build.sh
```

Transpile the ES6 and zip up the relevant files for upload by running:
````
$ npm run build
````
This should output files.zip to the project root for upload to the AWS Lambda Console.