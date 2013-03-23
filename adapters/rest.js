/**
 * Rest Adapter
 * This is Rest adapter to be used as data store. It makes request to url mentioned in configuration.
 * The url must be hosting valid Rest 
 *
 * @param	object		config		A javascript object (key: value pair), the config passed to Model.configure are passed to this method
 * @param	object		options		A javascript object (key: value pair), options passed to Model.facotry are passed to this method
 */
function Rest(config, options) {

	_Model.call(this, options);
	this.callbacks = config.callbacks;
}

/**
 * Extending the Rest Model with Base Model Object
 */
Rest.prototype = _Model.extend();

/**
 * Implementing find method
 */
Rest.prototype.find = function (options, callback) {
	if( ! options)
		var options = {};

	this.request(this.url, 'GET', options, {success: callback || false}, 'Loading Data');
}

/**
 * Implementing create method
 */
Rest.prototype.create = function (callback) {
	
	var thisProxy = this;
	this.request(this.url, 'POST', this.get(), {success: function (data) {
		thisProxy.id = data;
		callback.call(null, data);
	}});
	
}

/**
 * Implementing read method
 */
Rest.prototype.read = function (callback) {
	
	var thisProxy = this;
	this.request(this.url, 'GET', {'id': this.id}, {success: function (data) {

		jQuery.each(thisProxy.fields, function (i, f) {
			if(data[f])
				thisProxy[f] = data[f];
		});

		callback.call(null, data);

	}});
	
}

/**
 * Implementing update method
 */
Rest.prototype.update = function (callback) {
	
	var thisProxy = this;
	this.request(this.url, 'PUT', this.get(), {success: function (data) {
		callback.call(null, data);
	}});

}

/**
 * Implementing delete method
 */
Rest.prototype.delete = function (callback) {
	
	var thisProxy = this;
	this.request(this.url, 'DELETE', this.get(), {success: function (data) {
		callback.call(null, data);
	}});

}

/**
 * Implementing request method
 */
Rest.prototype.request = function (url, method, data, callbacks) {

	if( ! callbacks)
		var callbacks = {};

	if(callbacks.start)
		callbacks.start.call();
	else if(this.callbacks.start)
		this.callbacks.start.call();

	jQuery.ajax({
		url: url,
		type: method,
		data: data,
		complete: callbacks.complete || this.callbacks.complete || false,
		success: callbacks.success || this.callbacks.success || false,
		error: callbacks.error || this.callbacks.error || false
	});
}