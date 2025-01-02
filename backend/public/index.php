<?php
require_once __DIR__ . '/../app/bootstrap.php';

set_error_handler('ErrorHandler::handleError');
set_exception_handler('ErrorHandler::handleException');

header('Content-Type: application/json');

Database::initializeDatabase();

$router = new Router();

$router->addRoute('POST', '/register', 'AuthController@register');
$router->addRoute('POST', '/login', 'AuthController@login');
$router->addRoute('GET', '/logout', 'AuthController@logout');

$router->addRoute('POST', '/project', 'ProjectController@createProject');
$router->addRoute('POST', '/project/assign', 'ProjectController@assignMember');
$router->addRoute('GET', '/project', 'ProjectController@getAllProjects');
$router->addRoute('DELETE', '/project', 'ProjectController@deleteProject');

$router->addRoute('POST', '/task', 'TaskController@createTask');
$router->addRoute('POST', '/task/assign', 'TaskController@assignTask');
$router->addRoute('GET', '/task', 'TaskController@getAllTasks'); //get project tasks based on project id
$router->addRoute('DELETE', '/task', 'TaskController@deleteTask');

$router->addRoute('POST', '/category', 'CategoryController@createCat');
$router->addRoute('GET', '/category', 'CategoryController@getAllCategories');
$router->addRoute('POST', '/category/assign', 'CategoryController@assignCat');

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
