angular.module('gamertagService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Gamertags', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/gamertags');
			},
			create : function(gamertagData) {
				return $http.post('/api/gamertags', gamertagData);
			},
			delete : function(id) {
				return $http.delete('/api/gamertags/' + id);
			}
		}
	}]);
