angular.module('catersinho').config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'ProjetosCtrl'
	});

	$routeProvider.when('/projeto/novo', {
		templateUrl: 'views/form-new-project.html',
		controller: 'NovoProjetoCtrl'
	});

	$routeProvider.when('/saiba-mais/', {
		templateUrl: 'views/saiba-mais.html'
	});

	$routeProvider.when('/projeto/editar/:id', {
		templateUrl: 'views/form-edit-project.html',
		controller: 'EditProjetoCtrl'
	});

	$routeProvider.when('/projeto/:id', {
		templateUrl: 'views/project.html',
		controller: 'ProjetoCtrl'
	});

	
	$routeProvider.when('/doar/nova-doacao/:id', {
		templateUrl: 'views/form-donate.html',
		controller: 'DonateCtrl'
	});

	$routeProvider.otherwise({redirectTo: "/"});
})