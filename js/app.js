/*
  Please add all Javascript code to this file.
*/

// $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results) {
//     console.log(results);
//     results.data.feed.forEach(function(result) {
//         $("ul").append("<li>" + result.content.title + "</li>")
//     })
// })

'use strict';

$(document).ready(function() {

	// DIGG

    var diggUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";

    var diggRequest = $.ajax({
        url: diggUrl
	});

    diggRequest.done(function(diggFeed) {
        console.log(diggFeed);
        console.log("Digg Title: " + diggFeed.data.feed[0].content.title);

        var feedBase = ;
        var title = ;
        var category = ;
        var image = ;
        var count = ;
    });


	// MASHABLE

	var mashUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json";
	
    var mashRequest = $.ajax({
        url: mashUrl
	});

    mashRequest.done(function(mashFeed) {
        console.log(mashFeed);
        console.log("Mash Title: " + mashFeed.hot[0].title);
    });


    // REDDIT

    var redditUrl = "https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json";

    var redditRequest = $.ajax({
        url: redditUrl
	});

    redditRequest.done(function(redditFeed) {
        console.log(redditFeed);
        console.log("Reddit Title: " + redditFeed.data.children[0].data.title);

		Title
        Category
        Image
        ThingCount
    });


	// // LIFEHACKER

	// var lifeUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://lifehacker.com/rss";

 //    var requestLife = $.ajax({
 //        url: lifeUrl,
 //        dataType: "xml"
	// });

 //    requestLife.done(function(lifeFeed) {
 //    	var getNum = $(lifeFeed).find("item")[5].find("description");
 //        console.log(lifeFeed);
 //        console.log( "Life:", $(getNum).find("img").text());
 //    });

});
