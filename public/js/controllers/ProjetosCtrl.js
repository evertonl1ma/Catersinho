angular.module('catersinho').controller('ProjetosCtrl', function($scope, $http) {
	$scope.projetos = [];

	$http.get('/projetos')
	.then(function(success) {
		$scope.projetos = success.data;
	}, function(error) {
		console.log(error);
	})
});