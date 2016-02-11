'use strict';

juke.controller('BrowseAlbumsCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

	$http.get('/api/albums/')
		// need name and _id for cover image
		.then(function(response) {
			var arrayOfAlbumObjects = response.data;

			return arrayOfAlbumObjects.map(function(element) {
				element.imageUrl = '/api/albums/' + element._id + '.image';
				element.numberOfSongs = element.songs.length;
				return element;
			});
		})
	  .then(function(arrayOfAlbumObjects){
	  	// console.log("array of albums", arrayOfAlbumObjects)
	    $scope.albums = arrayOfAlbumObjects;
	  })
	  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.showAlbums = false;
  $scope.$on('viewAlbums', function(){
  	$scope.showAlbums = !$scope.showAlbums;
  })

  $scope.showOneAlbum = function(albumId){
    console.log(albumId);
  	$rootScope.$broadcast('showOneAlbum', albumId);
  	$scope.showAlbums = false;
  }

});
