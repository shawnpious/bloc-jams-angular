(function () {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };
        SongPlayer.currentSong = null;

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

        SongPlayer.stop = function (song) {
            currentBuzzObject.stop();
            song.playing = null;

        }

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
