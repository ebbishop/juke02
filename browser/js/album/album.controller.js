'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  
  // load our initial data
  $http.get('/api/albums/')
  .then(function(res){return $http.get('/api/albums/' + res.data[1]._id)}) // temp: use first
  .then(function(res){ return res.data})
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
  $scope.$on('showOneAlbum', function(event,albumID){
    $scope.showAlbum = !$scope.showAlbum
  });
  $scope.$on('viewAlbums', function(){
    $scope.showAlbum = false;
  })


  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)

  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };


});
