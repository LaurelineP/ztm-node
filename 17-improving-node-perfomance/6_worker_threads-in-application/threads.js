const { isMainThread, Worker, workerData } = require('worker_threads');


if( isMainThread ){
	console.log('Main thread', process.pid );

	new Worker( __filename, { workerData: [ 7,398, 5, 1 ]});
	new Worker( __filename, { workerData: [ 97, 123, 54, 11 ]});
} else {
	console.log('Worker', process.pid );
	console.log('workerData:', workerData, `sorted is ${ workerData.sort() }`)
}