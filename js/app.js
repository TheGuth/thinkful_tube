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

//nextPageToken for viewing additional results
var state = {
  items : [],
  nextPage: '',
  prevPage: '',
  searched: false,
  query: {
    part: 'snippet',
    key: 'AIzaSyBxN1jj2vdsQILbeEYLQi6jlVHZbP6f4wY',
    q: '',
    maxResults: 10,
    pageToken: '',
  }
};

var YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search/"

function getDataFromApi(searchTerm, callback) {
  state.query.q = searchTerm;

  $.getJSON(YOUTUBE_BASE_URL, state.query, callback);
}

function addItems(data){
  state.nextPage = data.nextPageToken;
  state.prevPage = data.prevPageToken;

  var itemArr = data.items.map(function(item, index){
    var thumbnail = item.snippet.thumbnails.default.url;
    var description = item.snippet.description;
    var title = item.snippet.title;
    var channelTitle = item.snippet.channelTitle;
    var channel = "https://www.youtube.com/channel/" + item.snippet.channelId;
    var vidUrl = "https://www.youtube.com/watch?v=" + item.id.videoId;
    return [thumbnail, vidUrl, title, description, channel, channelTitle];
  });

  state.items = itemArr;
  state.nextPage = data.nextPageToken;
  state.prevPage = data.prevPageToken;
}

function display(state){
  if (state.items.length === 0){
    $('#no-results').show();
    $('.nav').hide();
  }
  else {
    $('#no-results').hide();
    state.items.forEach(function(item){
      $('#js-results-list').append('<li><h3>' + item[2] +
      '</h3>' + '<br><a href="' + item[1] + '"><img src="' + item[0] +
      '"alt="' + item[3] + '"></a>' + '<br><a href="' + item[4] + '">' + item[5] + '</a></li>');
    });
    if (state.searched){
      $('.nav').show();
    }
  }
}

function initializeSearch(data){
  addItems(data);
  display(state);
}

function eventListeners(){

  $(".js-query").submit(function(e){
    state.searched = true;
    state.items = [];
    $('#js-results-list').empty();
    e.preventDefault();
    state.query.q = $("#js-search-text").val();
    getDataFromApi(state.query.q, initializeSearch);
  });

  $('#js-next-btn').click(function(e) {
    state.items = [];
    $('#js-results-list').empty();
    state.query.pageToken = state.nextPage;
    getDataFromApi(state.query.q, initializeSearch);
  });

  $('#js-prev-btn').click(function(e) {
    state.items = [];
    $('#js-results-list').empty();
    state.query.pageToken = state.prevPage;
    getDataFromApi(state.query.q, initializeSearch);
  });
}

$(function (){
  eventListeners();
});
//$(eventHandlers);
//OR
// $(function() {
//   eventHandlers();
// });
