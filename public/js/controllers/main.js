angular.module('gamertagController', [])

	// inject the Gamertag service factory into the controller
	.controller('mainController', ['$scope','$http','Gamertags', function($scope, $http, Gamertags) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all gamertags and show them
		// use the service to get all the gamertags
    //setTimeout(function(){
      Gamertags.get()
        .success(function(data) {
          $scope.gamertags = data;
          $scope.loading = false;
        });
    //}, 2000);

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createGamertag = function() {
			$scope.loading = true;

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				console.log($scope.formData);
				// call the create function from our service (returns a promise object)
				Gamertags.create($scope.formData)

					// if successful creation, call our get function to get all the new gamertags
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.gamertags = data; // assign our new list of gamertags
					});
			}
		};

		// DELETE ==================================================================
		// delete a gamertag
		$scope.deleteGamertag = function(id) {
			$scope.loading = true;

			Gamertags.delete(id)
				// if successful creation, call our get function to get all the new gamertags
				.success(function(data) {
					$scope.loading = false;
					$scope.gamertags = data; // assign our new list of gamertags
				});
		};

  
}]);
