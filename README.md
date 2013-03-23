# Model.js
A Javascript library that let you simulate models. You can write your own data store implementation (adapter) and use it with model.js. It comes bundled with REST and dummy store (a blue print to write your own adapter) implementation.

## Usage
First you must include model.js and the respective adapter in your html. Throughout this document, we will use Rest adapter, so we're gonna include that

	<script type="text/javascript" src="model.js"></script>
	<script type="text/javascript" src="adapters/rest.js"></script>

### Configuration
Before you can create a model, you need to configure that.

	Model.configure({
		adapter: Rest,
		config: {
			callbacks: {
				start: function () {
					console.log('Loading')
				},
				complete: function () {
					console.log('Loaded')
				},
				success: function () {
					console.log(arguments)
				},
				error: function () {
					console.log(arguments)
				}
			}
		}
	});

### Creating New Model
Take a look at the example below,

	var user = Model.factory({
		name: 'user',
		fields: ['id', 'first_name', 'last_name', 'location'],
		defaults: {
			location: 'Karachi, Pakistan'
		}
	});

Model.factory method takes an object as parameters, in which you define the name of model, its fields, and the default values of fields.

Since we are using Rest adapter, we need to specify the URL which is hosting the Rest API for current model.

	user.url = 'api/user.php';

You just created your first model, now let's see how to query on model and perform CRUD operations.

### Querying Model
Model's find method exposes a SQL like interface

	user.find({
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
	}, function (data) {
		// This is call back, iterate over data here
	});

### Create Model
Following is an example of how you can create a new model

	user.set('first_name', 'Abdullah');
	user.last_name = 'Ibrahim'; // This will also work
	user.create(function (data) {
		console.log('New user created');
		console.log('New user ID is '+user.id);
	});

Another way of doing this is calling

	user.save();
This method will update the existing record if model.id is set, otherwise create a new record. 

### Read Model
To read the user with ID 2, you need to use the following code

	user.id = 2;
	user.read(function (data) {
		console.log(data);
		console.log(user.first_name, user.last_name);
	});

### Update Model
To update the user with ID 2, you need to use the following code

	user.id = 2;
	user.location = 'Port 80'; // From Karachi, Pakistan
	user.update(function (data) {
		console.log(data);
	});
	// OR
	user.save();

### Delete Model
To delete the user with ID 2, you need to use the following code

	user.id = 2;
	user.delete(function (data) {
		// User deleted
	});

## TODO

* Include more options in find method like where_and, where_or etc
* Add relationship API between model