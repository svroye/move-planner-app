
var googleApiKey = "AIzaSyAzhuESasx-4iJYwSRu1QTFC0yVXKpItVk";
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // start URL for the Google Maps API
    var startURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=";


    //collect the values of the street and city boxes
    var streetName = $('#street').val();
    var cityName = $('#city').val();
    var address = streetName + ',' + cityName;

    //change the greeting text
    $greeting.text("So you want to live at " + address + '?');

    //complete the URL for the Google Maps API
    var endURL = startURL + address + '&key=' + googleApiKey;

    //append the image to the body
    $body.append('<img class="bgimg" src="' + endURL + '">');

    return false;
}

$('#form-container').submit(loadData);
