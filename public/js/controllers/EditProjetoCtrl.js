angular.module('catersinho').controller('EditProjetoCtrl', function($scope, $http, $routeParams) {
	$scope.projeto = {};

	$http.get(`/projetos/${$routeParams.id}`) 
		 .then(function(success) {
		 	$scope.projeto = success.data;
		 },
		 function(error) {
		 	console.log(error);
		 });
});