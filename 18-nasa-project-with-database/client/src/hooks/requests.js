
const API_URL = "http://localhost:8000";
async function httpGetPlanets() {
  // Load planets and return as JSON.
  const result = await fetch(`${ API_URL }/planets`, {
    "Access-Control-Allow-Origin": "*"
  });
  console.log('result:', result)
  return await result.json();
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${ API_URL }/launches`);
  const fetchedLaunches = await response.json();
  console.log('fetchedLaunches:', fetchedLaunches)
  return fetchedLaunches?.sort((a, b) => a.flightNumber - b.flightNumber );
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {
    const response = await fetch(`${ API_URL }/launches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( launch )
    });
    const returnResponse = await response.json();
    console.log('returnResponse:', returnResponse);
    return response;
  } catch ( error ){
      console.error( error );
      return { ok: false }
  }
}

async function httpAbortLaunch( id ) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    const response = await fetch(`${ API_URL }/launches/${ id }`, {
      method: 'DELETE'
    });
    console.log({response})
    return response;
  } catch( error ){
    console.error( error );
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};