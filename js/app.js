// Pseudo Code

//

///////////////////////////////////////////////////////////////////////////////

// Requirements

// 1. accepts a user search term

// 2. Get JSON from the youtube api based on the user search term

// 3. Display the thumbnail image of the returned videos

/////////////////////////////////////////////////////////////////////////////

// Extra Features

// 1. Make the images clickable, leading the user to the YouTube video,
//    on YouTube.

// 2. Make the images clickable, playing them in a lightbox?

// 3. Show a link for more from the channel that each video came from

// 4. Sho buttons to get more results (using the previous and next page 
//    links from the JSON)

/////////////////////////////////////////////////////////////////////////////////

// youtube api key:
// AIzaSyBxN1jj2vdsQILbeEYLQi6jlVHZbP6f4wY

// Search query endpoint

// https://www.googleapis.com/youtube/v3/search

// /?part=snippet&key=AIzaSyBxN1jj2vdsQILbeEYLQi6jlVHZbP6f4wY&q=dog/

// require parameters:

// part: 'snippet'
// key: (our API key)
// q: (your search term)

// www.youtube.com/watch?v= + "videoId";

// https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyBxN1jj2vdsQILbeEYLQi6jlVHZbP6f4wY&q=dog/

var YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search/?"

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyBxN1jj2vdsQILbeEYLQi6jlVHZbP6f4wY',
    q: 'dog',
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}






























