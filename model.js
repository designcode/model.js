/**
 * A Javascript library that let you simulate models. You can write your own data store implementation (adapter) and use it with model.js
 * It comes bundled with REST and dummy store (a blue print to write your own adapter) implementation.
 *
 * @author     Abdullah Ibrahim
 * @copyright  (c) 2013 designcode.me
 * @url			http://github.com/designcode/model.js
 */


/**
 * Modified version of Crockford's extend method, this functoin will be used when writing a new Adapter
 * http://javascript.crockford.com/prototypal.html
 */
Function.prototype.extend = function () {
	function F() {}
	F.prototype = this.prototype;
	return new F();
}



/**
 * Model Factory Object
 *
 * Since diffrent adapters can be used for CRUD operations, we're using Model factory.
 * This object have two static methods configure and factory
 */
function Model() {
	
}

/**
 * Since diffrent adapters can be used for CRUD operations, we're using Model factory. Any config sent to this method
 * is passed to Adapter's constructor.
 *
 * @param	object	options		A javascript object (key: value pair)
 * 								{
									adapter: REST,		// Required
									config: {
										callbacks: { 	// Optional
											start: function () {
												console.log('Loading Started')
											},
											complete: function () {
												console.log('Loading Complete')
											},
											success: function () {
												console.log(arguments)
											},
											error: function () {
												console.log(arguments)
											}
										}
									}
								}
 */
Model.configure = function (options) {
	if( ! options)
		throw 'Options passed to Model.configure is not an object';

	this.adapter = options.adapter;
	this.config = options.config;
	this.callbacks = options.callbacks;
}

/**
 * Create and return Model object using the adapter provided in configuration
 *
 * @param	string		name		Name of the model
 * @param	object		options		A javascript object (key: value pair)
 									{
 										name: 'my_model',
										fields: ['id', 'first_name', 'last_name', 'location'],
										defaults: {
											location: 'Karachi, Pakistan'
										}
									}
 * @return	object		adapter
 */
Model.factory = function (options) {
	if( ! options)
		throw 'Options passed to Model.factory is not an object';

	return new this.adapter(this.config, options);
}



/**
 * Model Abstract Object
 * This function serves as the constructor of _Model object. This must be called from adapter's contructor in context of adapter.
 *
 * @param	object		options		A javascript object (key: value pair), options passed in Model.facotry as passed as it is
 									to this function.
 */
function _Model(options) {
	this.name = options.name;
	this.fields = options.fields;
	this.defaults = options.defaults || {};
}

/**
 * Set a model's property
 *
 * @param	string		field		Name of the property
 * @param	mixed		value		Value of the property
 * @return	object		this		To support method chaining
 */
_Model.prototype.set = function (field, value) {
	this[field] = value;
	return this;
}

/**
 * Get a model's property
 *
 * @param	string		field		Name of the property which value needs to returned
 * @return	mixed					If the property parameter is provided, it will return value of that field, otherwise will
 									return a key:value pair of all properties of the Model
 */
_Model.prototype.get = function (field) {
	if(field)
		return this[field] || null;
	else
		return this.get_data();
}

/**
 * Get a model's all properties
 *
 * @return	mixed					Returns a key:value pair of all properties of the Model, if the id property of model is 
 									empty, it will fill the empty properties with defaults.
 */
_Model.prototype.get_data = function () {
	var data = new Object();
	var thisProxy = this;

	jQuery.each(this.fields, function (i, f) {
		if(thisProxy[f])
			data[f] = thisProxy[f];
		if(thisProxy.defaults[f] && ! thisProxy.id)
			data[f] = thisProxy.defaults[f];
	});

	return data;
}

/**
 * Query a model against the options provided. Must be implemented in the adapter
 *
 * @param	object		options		A javascript object (key: value pair)
 									{
										where: [
											['id', '=', 1], 
											['first_name', '=', 'Abdullah']
										],
										limit: {
											offset: 0, 
											limit: 5
										},
										order: {
											by: 'id',
											sort: 'DESC'
										}
									}
 * @param	function	callback	Function to be called when data is fetched
 */
_Model.prototype.find = function (options, callback) {
	throw 'Not Implemented';
}

/**
 * Create/Update a model. If the Model's id is not empty, it updates the Model, otherwise creates a new Model
 *
 * @param	function	callback	Function to be called when the record is created
 */
_Model.prototype.save = function (callback) {
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
_Model.prototype.create = function (callback) {
	throw 'Not Implemented';
}

/**
 * Reads a model on the basis of Model's id. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
_Model.prototype.read = function (callback) {
	throw 'Not Implemented';
}

/**
 * Updates a model on the basis of Model's id. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
_Model.prototype.update = function (callback) {
	throw 'Not Implemented';
}

/**
 * Deletes a model on the basis of Model's id. Must be implemented in the adapter
 *
 * @param	function	callback	Function to be called when the record is created
 */
_Model.prototype.delete = function (callback) {
	throw 'Not Implemented';
}