
// IIFE that returns the myPlaylist object to the global scope
// myPlaylist object contains functionality to filter songs, find a song etc
const myPlaylist = (function () {

    const findASong = function(songId, songs) {
        return songs.find(song => song.id === songId);
    }

    const filterSongs = function(playlist, mood) {
        return playlist.filter((item) => item.mood === mood);
    }

    const calculateTotalPlays = function(playlist) {
        // reduce collapses an array into a single value
        // in this case we want a single value that
        // represents total number of times all songs are played
        return playlist.reduce((prev, element) => {
            return prev + element.played;
        }, 0);
    }

    const transformPlaylist = function(playlist) {
        const playlistToRender = playlist.map((item, index) => {
            // es6 spread operator
            const newItem = { ...item };

            // assign new property to object
            newItem["displayText"] = `Played a total of ${item.played} times`;

            // tenery operator
            newItem["rating"] = (item.played > 30) ? "POPULAR" : "GOOD";

            // underlined is a boolean property
            newItem["underlined"] = index % 2 === 0;

            return newItem;
        });

        return playlistToRender;
    }

    // sorts the songs from most played to least played
    const sortSongs = function(playlist) {
        return playlist.sort((a, b) => b.played - a.played);
    }
    
    return {
        findById: findASong,
        filterByMood: filterSongs,
        getTotalPlays: calculateTotalPlays,
        transformPlaylistForRendering: transformPlaylist,
        sortDescending: sortSongs
    }
})();