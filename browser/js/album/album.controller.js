'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;

  // load our initial data
  function getOneAlbum(albumId){
    $http.get('/api/albums/' + albumId)
    .then(function(res){
      return res.data
    })
    .then(function(album){
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
        song.albumIndex = i;
      });
      $scope.album = album;
    })
    .then(function () {
      return StatsFactory.totalTime($scope.album);
    })
    .then(function(totalTime) {
      $scope.albumTotalTime = Math.floor(totalTime/60) + " minutes";
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound
  }

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else {
      if($scope.currentSong()) {
        PlayerFactory.resume();
      }
      else
      { PlayerFactory.start(song, $scope.album.songs); }
    }
  };


  $scope.showAlbum = false
  $scope.$on('showOneAlbum', function(event, albumId){
    console.log(albumId);
    $scope.showAlbum = !$scope.showAlbum
    getOneAlbum(albumId);

  });
  $scope.$on('viewAlbums', function(){
    $scope.showAlbum = false;
  })


  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

});
