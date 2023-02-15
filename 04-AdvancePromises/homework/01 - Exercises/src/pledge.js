'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

const _TSPending = 'pending';
const _TSFullFilled = 'fulfilled';
const _TSRejected = 'rejected';

function $Promise (executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('The executor must be function type.');
    };
    this._state = _TSPending;
	this._handlerGroups = [];
    executor(
        this._internalResolve.bind(this),
        this._internalReject.bind(this)
        );
};

$Promise.prototype._internalResolve = function(data) {
    if (this._state === _TSPending) {
        this._state = _TSFullFilled;
        this._value = data;
		this._callHandlers();
    };
};
$Promise.prototype._internalReject = function(reason) {
    if (this._state === _TSPending) {
        this._state = _TSRejected;
        this._value = reason;
		this._callHandlers();
    }; 
};
$Promise.prototype.then = function(successCb, errorCb) {
 	if (typeof successCb !== "function") successCb = false;
	if (typeof errorCb !== "function") errorCb = false;
	let downstreamPromise = new
		$Promise(function(){});
	this._handlerGroups.push({
					successCb,
					errorCb,
					downstreamPromise
					});
	if (this._state != _TSPending) { this._callHandlers()};
	return downstreamPromise;
};
$Promise.prototype._callHandlers = function() {
	while (this._handlerGroups.length > 0) {
		let handlersActuales = this._handlerGroups.shift();
		if (this._state === _TSFullFilled) {
			if (!handlersActuales.successCb) {
				handlersActuales.downstreamPromise._internalResolve(this._value)
			} else {
				const result = handlersActuales.successCb(this._value);
				if(result instanceof $Promise){
					return result.then(data => handlersActuales.downstreamPromise._internalResolve(data));
				} else {
					handlersActuales.downstreamPromise._internalResolve(result)
				}
			};
		}; // 1:54:55
		if (this._state === _TSRejected) {
			if (!handlersActuales.errorCb) {
				handlersActuales.downstreamPromise._internalReject(this._value)
			} else {handlersActuales.errorCb(this._value)};
		};		
	}; 
};
$Promise.prototype.catch = function(catchFn) {
	this.then(null, catchFn);	
};
   
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
