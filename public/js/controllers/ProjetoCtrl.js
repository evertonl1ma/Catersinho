angular.module('catersinho').controller('ProjetoCtrl', function($scope, $http, $routeParams, $timeout, $interval, dateFilter) {

	$scope.projeto = {};
	var teste = '';

	$http.get(`/projetos/${$routeParams.id}`)
		.then(function(success) {
			$scope.projeto = success.data;
		},
		function(error) {
			console.log(error);
		});
  
});

