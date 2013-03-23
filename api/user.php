<?php

	$users = array(
		array(
			'id'			=>	1,
			'first_name'	=>	'Abdullah',
			'last_name'		=>	'Ibrahim'
		),
		array(
			'id'			=>	2,
			'first_name'	=>	'Ahsan',
			'last_name'		=>	'Farooqui'
		),
		array(
			'id'			=>	3,
			'first_name'	=>	'Ovais',
			'last_name'		=>	'Tariq'
		),
		array(
			'id'			=>	4,
			'first_name'	=>	'Zeeshan',
			'last_name'		=>	'Khan'
		),
	);


	$method = strtoupper($_SERVER['REQUEST_METHOD']);

	switch ($method)
	{
		case 'POST':
			// Create
			echo '5';
		break;
		
		case 'GET':
			// Read
			//print_r ($_GET);
			
			header('Content-Type: application/json');

			if(isset($_GET['id']))
			{
				$user = array_filter($users, function ($user) {
					return ($user['id'] == $_GET['id']);
				});

				$user = array_shift($user);
				echo json_encode($user);
			}
			else
				echo json_encode($users);

		break;
		
		case 'PUT':
			header('Content-Type: application/json');

			parse_str(file_get_contents("php://input"), $_PUT);
			echo json_encode($_PUT);
		break;
		
		case 'DELETE':
			header('Content-Type: application/json');

			parse_str(file_get_contents("php://input"), $_DELETE);
			echo json_encode($_DELETE);
		break;
	}

	//header('Content-Type: application/json');
	//echo json_encode($users);
	//print_r ($_GET);

?>