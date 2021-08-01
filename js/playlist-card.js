// bunch of related functions to create song cards
// we have the card on the my favourite playlist page
const playlistCard = (function (document) {

    const create = function(item, handleSeeMore, handleHide) {
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
        played.innerText = item.displayText;

        let rating = document.createElement("p");
        rating.innerText = item.rating;

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
        leftContent.appendChild(rating);
        leftContent.appendChild(primaryBtn);
        leftContent.appendChild(hideBtn);

        row.appendChild(leftContent);
        row.appendChild(rightContent);

        card.appendChild(row);

        return card;
    }

    const createItunes = function(item) {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="row card-body">
                <div class="col-sm-8">
                    <h5 class="card-title">${item.artistName}</h5>
                    <p class="card-text">${item.collectionName}</p>
                    <p class="card-text">${item.trackName}</p>
                    <audio src=${item.previewUrl} type="audio/x-m4a" controls>
                        <code> Your browser doesn't support audio tags</code>
                    </audio>
                </div>
                <div class="col-sm-4 card-right-content">
                    <img class="img-fluid img-song" src=${item.artworkUrl100}/>
                </div>
            </div>
        `;

        return card;
    }

    return {
        createCard: create,
        createItunesCard: createItunes
    }

})(document);