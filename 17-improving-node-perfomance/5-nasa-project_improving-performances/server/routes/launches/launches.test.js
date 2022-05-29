const request 	= require( 'supertest' );
const app 		= require('../../src/app');

/**
 * Should solve issue "app.address is not a function from supertest"
 * https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function
 */


/** 
 * Test fixture with different tests cases using describe function 
 * == Testing group of related code
*/
describe("Test GET /launches", () => {
	it('should return 200 statusCode', async () => {

		/* 1. first initial approach - mocking returned response + assert w/ "jest" */
		// const response = 200;
		// expect( response ).toBe( 200 ); // 1.b - assertion + matcher


		/* 2. second approach - mocking request based on code with "supertest" + assert w/ "jest" */
		// const response = await request( app ).get('/launches') //2.a - second approach
		// expect( response.statusCode ).toBe( 200 ); //2.b - second approach


		/** 3. third approach - mocking request based on code + assert with "supertest" */
		const response = await request( app )
			.get('/launches') 	// mock "GET/" like a dev would request 
			.expect( 'Content-Type', /json/ ) 	// assertion on Content-Type header
			.expect( 200 ); 					// assertion on statusCode
	})
})


describe('Test POST /launch', () => {
	// 0. prep data to send
	const dataWithoutLaunchDate = {
		'mission'	: 'USS Enterprise',
		'target'	: 'Kepler-186 f',
		'rocket'	: 'NCC 1771-D'
	}
	const requestRequirements_OK = {
		...dataWithoutLaunchDate,
		'launchDate': 'January 7, 2033',
	};

	const errorInvalidLaunchDateMsg 	= 'Invalid launch date';
	const errorExpectedPropertyCount 	= '3';

	it( 'should response with 201 success', async () => {
		// 1. checks the request using "supertest"
		const response = await request( app )
			.post('/launches')
			.send( requestRequirements_OK )
			.expect('Content-Type', /json/)
			.expect( 201 );
		
		// 2. checks the body using "jest"
		// 2.1 checks the response.body matching ( most non-transformed data ) requirements
		expect( response.body ).toMatchObject( dataWithoutLaunchDate );

		// 2.2 checks the exceptions ( transformed data ) required
		const requestDate 	= new Date( requestRequirements_OK.launchDate ).valueOf();
		const responseDate 	= new Date( response.body.launchDate ).valueOf();
		expect( responseDate ).toBe( requestDate );

	});
	it( 'should catch missing required properties with 400', async() => {
		const response = await request( app )
			.post('/launches')
			.send( dataWithoutLaunchDate )
			.expect('Content-Type', /json/)
			.expect( 400 );

		// 3. expecting error && descriptive message
		expect( response.body.error ).toBeTruthy();
		expect( response.body.message ).toMatch( errorInvalidLaunchDateMsg );
		expect( response.body.message ).toMatch( errorExpectedPropertyCount );
	});
})