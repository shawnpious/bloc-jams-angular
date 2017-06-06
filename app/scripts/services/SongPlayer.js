(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };
        SongPlayer.currentSong = null;

        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;

        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

        var setSong = function (song) {
            song = song || SongPlayer.currentSong;
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentBuzzObject.bind('timeupdate', function () {
                $rootScope.$apply(function () {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });


            SongPlayer.currentSong = song;
        };

        SongPlayer.play = function (song) {

            if (SongPlayer.currentSong !== song) {
                setSong(song);

            }
            currentBuzzObject.play();
            song.playing = true;


        };
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            console.log(currentSongIndex)
            if (currentSongIndex < 0) {
                SongPlayer.stop(SongPlayer.currentSong)
            } else {
                var song = currentAlbum.songs[currentSongIndex];

                setSong(song);
                SongPlayer.play(song);
            }

        };

        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex >= currentAlbum.songs.length) {
                SongPlayer.stop(SongPlayer.currentSong)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                SongPlayer.play(song);
            }

        };

        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function (time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.stop = function (song) {
            currentBuzzObject.stop();
            song.playing = null;

        }

        SongPlayer.setVolume = function (volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
