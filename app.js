// Firebase needs to be registered as a module in the application before AngularFire can be used
var app = angular.module('app', ['firebase']);

// Firebase data can be accessed from the controller by injecting the $firebaseArray service
app.controller('Ctrl', function($scope, $firebaseArray, $http) { 
  // To read and write data to and from a Firebase database, a reference to it must first be created
	var ref = new Firebase('https://omdb.firebaseio.com/');
  // THe value of $scope.show determines if the page should show movie search results,
  // movie details, or favorite movies
	$scope.show = '';

  $scope.getMovieList = function() {
    // Make a GET request to the OMDB API to search for movies and then display the results
  	$http.get('https://www.omdbapi.com/?s=' + $scope.searchTerm).then(function(response) {
        $scope.movieList = response.data.Search;
        $scope.show = 'Movie List';
        $scope.searchTerm = "";
    });
  };

  $scope.getMovieDetails = function(movieTitle) {
    // Make a GET request to the OMDB API to retrieve movie details and then display the results 
  	$http.get('https://www.omdbapi.com/?t=' + movieTitle).then(function(response) {
        $scope.movieDetails = response.data;
        $scope.show = 'Movie Details';
    });
  };

  $scope.getFavorites = function() { 
    // Download the favorites data from firebase into a local array
  	$scope.favoriteMovies = $firebaseArray(ref);
    // Show the list of favorite movies on the page
  	$scope.show = 'Favorites';
  };

  $scope.saveFavorites = function() {
    // Download the favorites data from Firebase into a local array
  	$scope.favoriteMovies = $firebaseArray(ref);
    // Add the new favorite movie into the array
    // Note: This will automatically add the movie to the Firebase database!
  	$scope.favoriteMovies.$add({ 'title': $scope.movieDetails.Title, 'oid': $scope.movieDetails.imdbID })
  };

})