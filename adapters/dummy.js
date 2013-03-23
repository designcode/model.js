/**
 * Dummy Adapter, dummy implementation of adapter, serves as blueprint
 */

/**
 * Contructor, it gets called by Model factory
 * @param	object		config		A javascript object (key: value pair), the config passed to Model.configure are passed to this method
 * @param	object		options		A javascript object (key: value pair), options passed to Model.facotry are passed to this method
 */
function Dummy(config, options) {

	// Calling the constrcutor of parent object, you must do this in your adapter's constructors
	_Model.call(this, options);

	this.callbacks = config.callbacks;
}

/**
 * Extending the Dummy Model with Base Model Object, must do
 */
Dummy.prototype = _Model.extend();

/**
 * Now you must implement all the following methods, documentation about each method can be read in model.js
 */
Dummy.prototype.find = function (options, callback) {
	throw 'Not Implemented';
}

/**
 * Create/Update a model. If the Model's id is not empty, it updates the Model, otherwise creates a new Model
 *
 * @param	function	callback	Function to be called when the record is created
 */
Dummy.prototype.save = function (callback) {
	if(this.id)
		this.update(callback);
	else
		this.create(callback);
}

/**
 * Create a new record. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
Dummy.prototype.create = function (callback) {
	throw 'Not Implemented';
}

/**
 * Reads a model on the basis of Model's id. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
Dummy.prototype.read = function (callback) {
	throw 'Not Implemented';
}

/**
 * Updates a model on the basis of Model's id. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
Dummy.prototype.update = function (callback) {
	throw 'Not Implemented';
}

/**
 * Deletes a model on the basis of Model's id. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
Dummy.prototype.delete = function (callback) {
	throw 'Not Implemented';
}