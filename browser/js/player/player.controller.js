'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;  

  $scope.getProgress = PlayerFactory.getProgress;

  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.previous;

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing()){
      PlayerFactory.pause();
    } else {
      if($scope.currentSong()) {
        PlayerFactory.resume();
      }
      else
        {PlayerFactory.start(song);}
    }
  };

});
