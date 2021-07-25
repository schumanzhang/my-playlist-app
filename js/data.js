
// IIFE that returns the selectPlayList function to the global scope
// so that the playlist.js file can have access to this
const selectPlayList = (function () {

    // JSON formt
    const playlist = [
        {   
            id: "0001",
            artist: "Ed Sheeren",
            song: "Bad Habits",
            image: "./images/ed.jpeg",
            mood: "happy",
            played: 34
        },
        {   
            id: "0002",
            artist: "Olivia Rodrigo",
            song: "Good 4 U",
            image: "./images/olivia.jpeg",
            mood: "happy",
            played: 3
        },
        {   
            id: "0003",
            artist: "Justin Beiber",
            song: "Stay",
            image: "./images/justin.png",
            mood: "party",
            played: 322
        },
        {   
            id: "0004",
            artist: "Dojo Cat",
            song: "Kiss Me More",
            image: "./images/dojocat.jpeg",
            mood: "happy",
            played: 322
        },
        {   
            id: "0005",
            artist: "Glass Animals",
            song: "Heat Wave",
            image: "./images/glass.png",
            mood: "sad",
            played: 32
        },
        {   
            id: "0006",
            artist: "The Weeknd",
            song: "Save Your Tears",
            image: "./images/weeknd.jpg",
            mood: "happy",
            played: 2
        },
        {   
            id: "0007",
            artist: "The Weeknd",
            song: "After hours",
            image: "./images/weeknd.jpg",
            mood: "sad",
            played: 10
        },
        {   
            id: "0008",
            artist: "KSI",
            song: "Holiday",
            image: "./images/ksi.jpeg",
            mood: "sad",
            played: 80
        },
        {   
            id: "0009",
            artist: "Ariana Grande",
            song: "Positions",
            image: "./images/ariana.jpeg",
            mood: "party",
            played: 23
        },
        {   
            id: "0010",
            artist: "Dua Lipa",
            song: "Levitating",
            image: "./images/dualipa.jpeg",
            mood: "party",
            played: 44
        },
    ]
    
    // higher order function - function that takes in 
    // creates a closure that captures the playlist above
    // returns a part of the playlist array that matches the 'mood'
    return function(mood) {
        return playlist.filter((item) => item.mood === mood);
    }
})();