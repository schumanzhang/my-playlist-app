(function (document) {

    const jsonServerBaseUrl = "http://localhost:3000";

    const songId = sessionStorage.getItem("songId");
    const mainContent = document.querySelector(".main-content");

    const renderSongPage = function(songId) {
        
        fetch(`${jsonServerBaseUrl}/playlist/${songId}`)
            .then(response => response.json())
            .then(song => {
                console.log("Promise resolved successfully: ", song);

                let img = document.createElement("img");
                img.className = "img-fluid title-image";
                img.src = song.image;

                let h5 = document.createElement("h5");
                h5.innerText = song.artist;

                let songName = document.createElement("p");
                songName.innerText = song.song;

                let played = document.createElement("p");
                played.innerText = `Played ${song.played} times`;

                mainContent.appendChild(img);
                mainContent.appendChild(h5);
                mainContent.appendChild(songName);
                mainContent.appendChild(played);
            })
            .catch(error => {
                console.error("Promise rejected, the error is: ", error);  
                renderEmpty();
            });
    }

    const renderEmpty = function() {
        let h1 = document.createElement("h1");
        h1.innerText = "SONG NOT FOUND";
        mainContent.appendChild(h1);
    }

    console.log(songId);
    if (songId) {
        renderSongPage(songId);
    } else {
        renderEmpty();
    }

})(document);