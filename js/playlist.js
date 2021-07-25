// Wrapping javascript code for my playlist in IIFE
// Takes the 'selectPlayList' function as argument
(function (selectPlayList, document, window) {

    let currentMood = "";

	const filterBar = document.querySelector("#inputlg");
    const playedText = document.getElementById("playedText");
    const songContainer = document.querySelector(".song-container");

	//
	// Methods
	//
    const handleSeeMore = function(e) {
        window.alert(e.currentTarget.songId);

        // save the ID and mood in session
        // pass the data onto the song page
        sessionStorage.setItem("songId", e.currentTarget.songId);
        sessionStorage.setItem("mood", currentMood);

        // a local link, won't work elsewhere!
        window.location.href = `${window.location.origin}/Users/schumanzhang/Desktop/academyxi/phase_1/tutorial/my-playlist-app/song.html`;
    };

    const handleHide = function(e) {
        const cardToRemove = document.getElementById(e.currentTarget.songId).remove();
    };

    const handleFilter = function(e) {
        console.log("handleSearch keyup: ", e);
        console.log("handleSearch value: ", e.target.value);

        const newPlayList = selectPlayList(e.target.value);
        console.log("handleSearch newPlayList: ", newPlayList);

        if (newPlayList.length > 0) {
            currentMood = e.target.value;
            while (songContainer.firstChild) {
                songContainer.removeChild(songContainer.lastChild);
            }
            renderPlaylist(newPlayList);
        }
    };

    const renderPlayStat = function(playlistItems) {
        const totalPlays = playlistItems.reduce((prev, element) => {
            return prev + element.played;
        }, 0);

        playedText.innerHTML = `<p>Your playlist is played a total of <b>${totalPlays}</b> times</p>`
    };

	const renderPlaylist = function(playlist) {
        console.log("playlist to load: ", playlist);

        // map each individual playlist object
        const playlistItems = playlist.map((item) => {
            const displayItem = {
                displayPlayed: `Played a total of ${item.played} times`,
            };

            return Object.assign(item, displayItem);
        });

        // render them
        for (item of playlistItems) {
            const card = createPlaylistCard(item);
            songContainer.appendChild(card);
        }

        // redner the total play stat
        renderPlayStat(playlistItems);
    };

    const createPlaylistCard = function(item) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = item.id;

        let row = document.createElement("div");
        row.className = "row card-body";

        let leftContent = document.createElement("div");
        leftContent.className = "col-sm-8";

        let h5 = document.createElement("h5");
        h5.innerText = item.artist;

        let song = document.createElement("p");
        song.innerText = item.song;

        let played = document.createElement("p");
        played.innerText = item.displayPlayed;

        let primaryBtn = document.createElement("a");
        primaryBtn.className = "btn btn-primary";
        primaryBtn.text = "See More";
        primaryBtn.style.marginRight = "10px";
        primaryBtn.addEventListener("click", handleSeeMore);
        primaryBtn.songId = item.id;

        let hideBtn = document.createElement("a");
        hideBtn.className = "btn btn-danger"
        hideBtn.text = "Hide";
        hideBtn.addEventListener("click", handleHide);
        hideBtn.songId = item.id;

        let rightContent = document.createElement("div");
        rightContent.className = "col-sm-4 card-right-content";

        let img = document.createElement("img");
        img.src = item.image;
        img.className = "img-fluid";

        // construct the DOM tree
        rightContent.appendChild(img);
        leftContent.appendChild(h5);
        leftContent.appendChild(song);
        leftContent.appendChild(played);
        leftContent.appendChild(primaryBtn);
        leftContent.appendChild(hideBtn);

        row.appendChild(leftContent);
        row.appendChild(rightContent);

        card.appendChild(row);

        return card;
    };

	
	// Register Event Listeners
	filterBar.addEventListener('keyup', handleFilter);
    
    const initPlaylist = selectPlayList(currentMood);

    renderPlaylist(initPlaylist);

})(selectPlayList, document, window);