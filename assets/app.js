// Initial array of topics
var topicArr = ["fail", "cry", "pain", "funny"];

// Function for displaying buttons
function renderButtons() {

    // Delete the content inside the buttons-appear-here div prior to adding new topics, so that you don't get repeat buttons
    $("#buttons-appear-here").empty();

    // Loop through the array of topics, then generate buttons for each topic in the array
    for ( var i = 0; i < topicArr.length; i++) {
        var newButton = $("<button>" + topicArr[i] + "</button>");
        newButton.attr("data-term", topicArr[i]);
        $("#buttons-appear-here").append(newButton);
    }
};

// This function handles events where the add button is clicked
$("#add-button").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form
    event.preventDefault();
    // grab the text the user types into the input field
    var input = $("#search-term").val().trim();
    // add the new topic into the topicArr
    topicArr.push(input);
    // Then renderButtons function is called, rendering the list of movie buttons
    renderButtons();
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();


$("#buttons-appear-here").on("click", "button", function() {
    // set term equal to the word/phrase that the user input
    var term = $(this).attr("data-term");
    // sets the queryURL to only get 10 gifs and only rated pg or lower
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.get(queryURL).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            // Made a div with jQuery and stored it in a variable named termDiv.
            var termDiv = $("<div>");
            // Made a paragraph tag with jQuery and stored it in a variable named p.
            var p = $("<p>");
            // Set the inner text of the paragraph to the rating of the image in results[i].
            p.text("rating: " + results[i].rating);
            // Made an image tag with jQuery and stored it in a variable named termImage.
            var termImage = $("<img>");
            // Set the image's src to results[i]'s fixed_height_still.url so that it displays not playing when first loaded
            termImage.attr("src", results[i].images.fixed_height_still.url);
            // appends the term they clicked to each related gif displayed
            termDiv.append("<h3>" + term + "</h3>");
            // Append the termImage variable to the termDiv variable.
            termDiv.append(termImage);
            // Append the p variable to the termDiv variable.
            termDiv.append(p);
            // Prepend the termDiv variable to the element with an id of gifs-appear-here.
            $("#gifs-appear-here").prepend(termDiv);
        }
        });
});