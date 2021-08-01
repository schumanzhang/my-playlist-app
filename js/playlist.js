// Wrapping javascript code for my playlist in IIFE
// Takes the 'myPlaylist' object as argument
(function (myPlaylist, playlistCard, document, window) {

    let playlist;

    const jsonServerBaseUrl = "http://localhost:3000";
	const filterBar = document.querySelector("#inputlg");
    const playedText = document.getElementById("playedText");
    const songContainer = document.querySelector(".song-container");

    const loadingSpinner = document.getElementsByClassName("spinner-border");
    const errorMessage = document.getElementById("errorMessage");
    const emptyMessage = document.getElementById("emptyMessage");

    errorMessage.style.display = "none";
    emptyMessage.style.display = "none";
    
	//
	// Methods
	//
    const handleSeeMore = function(e) {
        // save bits of data into session storage to
        // be accessed on the song page
        sessionStorage.setItem("songId", e.currentTarget.songId);
        window.location.href = `./song.html`;
    };

    const handleHide = function(e) {
        document.getElementById(e.currentTarget.songId).remove();
    };

    const handleFilter = function(e) {
        console.log("handleSearch value: ", e.target.value);

        if (playlist) {
            const newPlayList = myPlaylist.filterByMood(playlist, e.target.value);
            console.log("handleSearch newPlayList: ", newPlayList);

            if (newPlayList.length > 0) {
                // first we need to remove current playlist
                while (songContainer.firstChild) {
                    songContainer.removeChild(songContainer.lastChild);
                }
                renderPlaylist(newPlayList);
            }
        }
    };

    const renderPlayStat = function(playlistItems) {
        const totalPlays = myPlaylist.getTotalPlays(playlistItems);
        playedText.innerHTML = `<p>Your playlist is played a total of <b>${totalPlays}</b> times</p>`
    };

	const renderPlaylist = function(playlist) {
        const playlistItems = myPlaylist.transformPlaylistForRendering(playlist);
        const sortedPlaylistItems = myPlaylist.sortDescending(playlistItems);
        // render them
        for (item of sortedPlaylistItems) {
            const card = playlistCard.createCard(item, handleSeeMore, handleHide);
            songContainer.appendChild(card);
        }
        // render the total play stat
        renderPlayStat(sortedPlaylistItems);
    };

    const getPlaylistFromServer = function(e) {
        // TODO: abstract out the asynchronous code and put it here
    };

	// Register Event Listeners
	filterBar.addEventListener("keyup", handleFilter);

    // this event fires when the DOM is fully loaded
    window.addEventListener("DOMContentLoaded", (event) => {

        console.log("DOM fully loaded");
        // using fetch to communicate with remote server
        // asynchronously - this is non-blocking code 
        fetch(`${jsonServerBaseUrl}/playlist`)
            .then(response => response.json())
            .then(data => {
                console.log("Promise resolved successfully: ", data);
                loadingSpinner[0].style.display = "none";
                
                if (Array.isArray(data) && data.length > 0) {
                    // hide the loading spinner
                    playlist = data;
                    renderPlaylist(data);
                } else {
                    emptyMessage.style.display = "block";
                }
            })
            .catch(error => {
                console.error("Promise rejected, the error is: ", error);
                loadingSpinner[0].style.display = "none";
                errorMessage.style.display = "block";
            });

        console.log("this code will run before the promise resolves");
        console.log("this code will also run before the promise resolves");
    });

})(myPlaylist, playlistCard, document, window);