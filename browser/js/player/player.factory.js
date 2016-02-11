'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var currentSong = null;
  var currentSongList;
  var whereAmI;
  var progress = 0;

  return {
  	start: function(song, songList) {
	    if(songList) {
	    	currentSongList = songList;
	    }
	    this.pause();
	    // $scope.playing = true;
	    // resume current song
	    // if (song === $scope.currentSong) return audio.play();
	    // enable loading new song
	    currentSong = song;
	    audio.src = song.audioUrl;
	    audio.load();
	    audio.play();
  	},
  	  pause: function() {
	    audio.pause();
  	},
  	  resume: function() {
	    audio.play();
	},
  	  isPlaying: function() {
	    return !audio.paused;
	},
  	  getCurrentSong: function() {
  	  	return currentSong;
	},
  	  next: function() {
  	  	this.skip(1);
	},
  	  previous: function() {
  	  	this.skip(-1);
	},
	skip: function(interval){
  	  	whereAmI = currentSongList.indexOf(currentSong);

  	  	if(whereAmI+interval<0) {
  	  		this.start(currentSongList[currentSongList.length - 1]);
  	  	}else if(whereAmI+interval>currentSongList.length-1) {
  	  		this.start(currentSongList[0])
  	  	}else{
  	  		this.start(currentSongList[whereAmI+interval])
  	  	}
	},
	getProgress: function(){
		if(currentSong){
		// 	audio.addEventListener('timeupdate', function(){
			console.log( audio.currentTime)
			console.log( audio.duration)
				return 100*(audio.currentTime / audio.duration);
		// 	})
		}
		return 0;
	}
  }
});

/* 

It should expose methods like:

  .start, that loads and plays a song (or optional collection of songs)
  .pause, that pauses any currently-playing song
  .resume, that continues the current song after pause
  .isPlaying, that returns a boolean
  .getCurrentSong, be it playing or paused
  .next, that moves to the next song in a list
  .previous, that moves to the previous song in a list
  .getProgress, which returns a value from 0 to 1

  */