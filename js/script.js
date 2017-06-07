
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

    //**************************************************************GOOGLE STREET VIEW API********************************************
    // start URL for the Google Maps API
    var startURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=";

    //collect the values of the street and city boxes
    var streetName = $('#street').val();
    var cityName = $('#city').val();
    var address;
    if (streetName){
        address = streetName + ', ' + cityName;
    } else {
        address = cityName
    }
    

    //change the greeting text
    $greeting.text("So you want to live at " + address.toUpperCase() + '?');

    //complete the URL for the Google Maps API
    var endURL = startURL + address + '&key=' + googleApiKey;

    //append the image to the body
    $body.append('<img class="bgimg" src="' + endURL + '">');

    //******************************************************************NEW YORK TIMES API***************************************************
    //start URL for NYT API
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var queryData = {
        'q' : cityName,
        'api-key' : NYTApiKey
    };

    //get response from NYT
    $.getJSON( url, queryData, function(data) {
        $nytHeaderElem.text("New York Times articles about " + cityName.toUpperCase());
        //get articles
        var responseDoc = data.response.docs;
        //loop through the articles
        responseDoc.forEach(function(currentValue){
            //get URL, title and small intro for each article
            var link = currentValue.web_url;
            var title = currentValue.headline.main;
            var abstract = currentValue.snippet;
            //append to the document as an element of an unorder list
            var HTMLElement = '<li><a href="' + link + '" target="_blank">' + title + '</a> <p>' + abstract + '</p> </li>'; 
            $nytElem.append(HTMLElement);
        })
    })
    .fail(function(){
         $nytHeaderElem.text("New York Times articles could not be loaded");
    })


    //*******************************************************************WIKIPEDIA API ***********************************************************
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityName + "&format=json";
    var settings = {
        dataType : "jsonp",
        success : function(data, textStatus, jqXHR){
            var articles = data[1];
            var urls= data[3];
            for(var i=0; i < articles.length; i++){
                var elem = '<li> <a href="' + urls[i] + '" target="_blank">' + articles[i] + '</a></li>';
                $wikiElem.append(elem);
            }

            clearTimeout(wikiRequestTimeout);
        }
    };

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get Wikipedia resources")
    },8000);

    $.ajax(wikiUrl,settings);


    return false;
}

$('#form-container').submit(loadData);
