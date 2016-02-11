'use strict';

juke.controller('SidebarController', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {
	$scope.viewAlbums = function(){
		console.log('broadcasting');
		$rootScope.$broadcast('viewAlbums');
	}
});