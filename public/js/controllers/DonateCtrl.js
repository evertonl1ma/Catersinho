angular.module('catersinho').controller('DonateCtrl', function($scope, $http, $routeParams, $timeout) {
	$scope.projeto = {};

	$http.get(`/doar/${$routeParams.id}`)
		.then(function(success) {
			$scope.projeto = success.data;
			console.log(success.data);
		},
		function(error) {
			console.log(error);
		})
})