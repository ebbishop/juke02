'use strict';

juke.controller('BrowseAlbumsCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

	$http.get('/api/albums/')
		// need name and _id for cover image
		.then(function(response) {
			// console.log("response data:",response.data)
			// var arrayOfAlbumObjects = response.data;
			var arrayOfAlbumObjects = response.data;

			// for (var i = 0; i < arrayOfAlbumObjects.length; i++) {
			// 	arrayOfAlbumObjects[i].imageUrl = '/api/albums/' + arrayOfAlbumObjects[i]._id + '.image';
			// 	arrayOfAlbumObjects[i].numberOfSongs = arrayOfAlbumObjects[i].songs.length;
			// }

			return arrayOfAlbumObjects.map(function(element) {
				element.imageUrl = '/api/albums/' + element._id + '.image';
				element.numberOfSongs = element.songs.length;
				return element;
			});


			// console.log("array of album objects", arrayOfAlbumObjects)
			// return arrayOfAlbumObjects;
		})
	  .then(function(arrayOfAlbumObjects){
	  	// console.log("array of albums", arrayOfAlbumObjects)
	    $scope.albums = arrayOfAlbumObjects;
	  })
	  .catch($log.error); // $log service can be turned on and off; also, pre-bound


});
