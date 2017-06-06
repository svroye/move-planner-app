
var googleApiKey = "AIzaSyAzhuESasx-4iJYwSRu1QTFC0yVXKpItVk";
var NYTApiKey = "8c50570480a84e43953e42c4c556b6dd";

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //**************************************GOOGLE STREET VIEW API********************************************
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

    //***************************************NEW YORK TIMES API***************************************************
    //start URL for NYT API
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var queryData = {
        'q' : cityName,
        'api-key' : NYTApiKey
    };

    $nytHeaderElem.text("New York Times articles about " + cityName);
    $.getJSON( url, queryData, function(data) {
        var responseDoc = data.response.docs;
        console.log(responseDoc);
        responseDoc.forEach(function(currentValue,index,array){
            var link = currentValue.web_url;
            var title = currentValue.headline.main;
            var headline = currentValue.headline.print_headline;
            var HTMLElement = '<li><a href="' + link + '">' + title + '</a><br>' + headline; 
            $('#nytimes-articles').append(HTMLElement);
        })
    });

    return false;
}

$('#form-container').submit(loadData);
