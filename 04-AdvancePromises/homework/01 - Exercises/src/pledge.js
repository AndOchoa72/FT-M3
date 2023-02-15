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
	this._handlerGroups.push({
					successCb,
					errorCb
					});
	if (this._state != _TSPending) { this._callHandlers()};
};
$Promise.prototype._callHandlers = function() {
	while (this._handlerGroups.length > 0) {
		let handlersActuales = this._handlerGroups.shift();
		let successCb = handlersActuales.successCb;
		let errorCb = handlersActuales.errorCb;
		if (this._state == _TSFullFilled) {
			if (successCb !== false) successCb(this._value);
		};
		if (this._state == _TSRejected) {
			if (errorCb !== false) errorCb(this._value);
		};		
	}; 
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
