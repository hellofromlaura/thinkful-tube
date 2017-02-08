//key: AIzaSyBK9IeVn3O2tVMKQ5pN5nYsC9jWKBgZnEQ

// App Requirements
// Accept a user search term
// Get JSON from the YouTube API based on the user search term
// Display the thumbnail image of the returned videos

/*
1 - choose your api by reading the documentation
2 - read the documentation
3- try API endpoints in the browser
https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBK9IeVn3O2tVMKQ5pN5nYsC9jWKBgZnEQ&q=dog&r=json

*/


// ADDING SEARCH HISTORY:
// 1. Create a state property for remembering history - what would be a good data type?
// 2. Create a state modification function - it will add each new search term submitted to the history prop
// 3. Change your render function to also render the new search history on page (in addition to the video list it's already doing)
// =====


var youtubeURL = "https://www.googleapis.com/youtube/v3/search"

var appState = {
	results: [ ]
}

// STATE MODIFICATION FUNCTIONS
function setResults(state, newResults) {
	state.results = newResults;
}

// RENDERING FUNCTIONS
function render(state) {
	// 		<li><img src="{videoItemUrl}"></li>

	var newElements = state.results.map(function(result){
		return "<li><img src='" +result.snippet.thumbnails.medium.url + "'></li>";
	})

	$('.results-to-show').html(newElements);
	$('.term-to-search').val('');
}


// API FUNCTIONS
function handleResponse(data){
	setResults(appState, data.items);
	console.log(appState);
	render(appState);
}

function getDataFromApi(searchTerm) {
  var query = {
   
  	part: "snippet",
  	key: "AIzaSyBK9IeVn3O2tVMKQ5pN5nYsC9jWKBgZnEQ",
  	q: searchTerm,
  	r: "json"

  }

  // getJSON([API Endpoint, (string)], [Parameters (Object)], [Callback Function (function)])

  $.getJSON(youtubeURL, query, handleResponse);

}


$(function(){
  $('.to-search').click(function(e){
    e.preventDefault();
    var searchTerm = $('.term-to-search').val();
 	getDataFromApi(searchTerm); 
  
  });
});
