// Wraps the code for adding a new song to my playlist
(function (document) {

    const jsonServerBaseUrl = "http://localhost:3000";

    let form = document.getElementById("song-form");
    let errors = document.getElementsByClassName("error");

    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    const loadingSpinner = document.getElementsByClassName("spinner-border")[0];

    loadingSpinner.style.opacity = 0;
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    const hideErrors = function(errors) {
        for(const error of errors) {
            error.style.display = "none";
        };
    };

    // generate absoluely unique ID
    const uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const formValidation = function(formInputs) {

        let noErrors = true;

        // check artist name must not be empty
        if (formInputs[0].value === "") {
            noErrors = false;
            document.querySelector(".error-artist").style.display = "inline";
        }

        if (formInputs[1].value === "") {
            noErrors = false;
            document.querySelector(".error-song").style.display = "inline";
        }

        if (formInputs[3].value === "") {
            noErrors = false;
            document.querySelector(".error-mood").style.display = "inline";
        }

        if (formInputs[4].value === "" || !parseInt(formInputs[4].value)) {
            noErrors = false;
            document.querySelector(".error-played").style.display = "inline";
        }

        return noErrors;
    };

    const addSongToPlaylist = function(e) {
        e.preventDefault();
        hideErrors(errors);

        console.log("addSongToPlaylist: ", e.target[0].value);

        const formHasNoErrors = formValidation(e.target);

        if (formHasNoErrors) {
            // POST request to the JSON server to add this song
            form.style.display = "none";
            loadingSpinner.style.opacity = 1;

            fetch(`${jsonServerBaseUrl}/playlist`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: uuidv4(),
                    artist: e.target[0].value,
                    song: e.target[1].value,
                    image: e.target[2].value,
                    mood: e.target[3].value,
                    played: parseInt(e.target[4].value)
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Promise resolved successfully: ", data);
                loadingSpinner.style.opacity = 0;
                successMessage.style.display = "block";
            })
            .catch(error => {
                console.error("Promise rejected, the error is: ", error);
                loadingSpinner.style.opacity = 0;
                errorMessage.style.display = "block";
            })
        }
    };

    form.addEventListener("submit", addSongToPlaylist);

    hideErrors(errors);

})(document);