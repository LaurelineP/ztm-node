/** 1. Access command from the command line using process.argv ( argument passed in the command )
 * process.argv[
 * 		node installation path
 * 		any argument given to the command
 * ]
 */

// ENGINE: v8 Chromium
// RUNNER: Node / deno --> runs js in backend
function logInfo(message) {
  console.log(`\n\n	[ ${message} ]`);
}

const mission = process.argv[2];
function getProcessArgs() {
  logInfo("PROCESS.ARGV");

  if (mission) console.log(`Time to ${mission}`);
  else console.log("No mission");
}

/* -------------------------------------------------------------------------- */
/*                                 SYNCHRONOUS                                */
/* -------------------------------------------------------------------------- */
function getSynchronousBehavior() {
  logInfo("SYNCHRONOUS");

  console.log("🐇 finishes");
  console.log("🐢 finishes");
}
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                ASYNCHRONOUS                                */
/* -------------------------------------------------------------------------- */
/**
  settimeout acception a callback ( function called
  after everything in its scope is done )
*/
function getAsynchronousBehavior() {
  logInfo("ASYNCHRONOUS");

  setTimeout(() => console.log("🐇 finishes"), 500);
  console.log("🐢 finishes");
}


/* -------------------------------------------------------------------------- */
/*                           NON-BLOCKING FUNCTIONS                           */
/* -------------------------------------------------------------------------- */
/**
  Blocking code : code running line by line
  Non-blocking functions:
  - timers js functions
  - request
  - read/write a file
  CPU will delegate ( non blocking )
    - hard disk
    - network card
 */


/* -------------------------------------------------------------------------- */
/*                                   THREADS                                  */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                       PRACTICING AND EXPLORING BLOCK                       */
/* -------------------------------------------------------------------------- */
getProcessArgs();
getSynchronousBehavior();
getAsynchronousBehavior();

/* -------------------------------------------------------------------------- */

module.export = {
  logInfo
}