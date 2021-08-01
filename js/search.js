// Wrap the code to do with iTunes search here
(function (playlistCard, document) {

    const itunesBaseUrl = "https://itunes.apple.com/search";

    const songContainer = document.querySelector(".song-container");
    const btnSearch = document.querySelector("#btn-search");
    const searchBar = document.querySelector("#inputlg");
    const loadingSpinner = document.getElementsByClassName("spinner-border")[0];
    const errorMessage = document.getElementById("errorMessage");
    const emptyMessage = document.getElementById("emptyMessage");

    loadingSpinner.style.opacity = 0;
    errorMessage.style.display = "none";
    emptyMessage.style.display = "none";

    const renderItunesSongs = function(songs) {
        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.lastChild);
        }
    
        for (const song of songs) {
            songContainer.appendChild(playlistCard.createItunesCard(song));
        }
    }

    // Methods
    const searchItunes = function(e) {
        const searchText = searchBar.value;
        console.log("searchText: ", searchText);
       
        if (searchText !== "") {
             // show the loading spinner
            loadingSpinner.style.opacity = 1;
            
            // do an iTunes search
            // GET request to iTunes API
            const searchTerm = encodeURIComponent(searchText);
            fetch(`${itunesBaseUrl}?term=${searchTerm}&media=music&limit=15`)
                .then(response => response.json())
                .then(data => {
                    console.log("Promise resolved successfully: ", data);

                    loadingSpinner.style.opacity = 0;
                    emptyMessage.style.display = "none";
                    errorMessage.style.display = "none";

                    if (data.resultCount > 0) {
                        renderItunesSongs(data.results);
                    } else {
                        emptyMessage.style.display = "block";
                    }
                })
                .catch(error => {
                    console.error("Promise rejected, the error is: ", error);
                    loadingSpinner.style.opacity = 0;
                    errorMessage.style.display = "block";
                });
        }
    };

    // Event listeners
    btnSearch.addEventListener("click", searchItunes);

})(playlistCard, document);