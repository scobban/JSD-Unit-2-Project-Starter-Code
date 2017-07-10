'use strict';

var RssFeed = {};

// Feed URL management
var feedList = [
    "http://digg.com/api/news/popular.json",
    "http://mashable.com/stories.json",
    "https://www.reddit.com/top.json",
    "http://lifehacker.com/rss"
];
// remove the "www" and everything after the third "/"
// var stripDomain = (function(url) {
//     var justDomain = url.replace("www.", "").split("/")[2];
//     return justDomain;
// });

var feedPrefix = "https://accesscontrolalloworiginall.herokuapp.com/";

// loader
var popUp = $("#popUp");
var showLoader = function(){
    popUp.removeClass("hidden");
};
var showDetails = function(){
    popUp.removeClass("loader hidden");
};
var hideOverlay = function(){
    popUp.addClass("loader hidden");
};

var refillPopUp = function(newH, newP, newU) {
    popUp.find(".container h1").text(newH);
    popUp.find(".container p").text(newP);
    popUp.find(".container a").attr("href", newU);
}

var searchBtn = $("#searchBtn");
var toggleSearch = function(){
    searchBtn.parent().toggleClass("active");
    console.log("Toggle Search");
};

var displayFeedName = function(name){
    $("#navFeed span").text(name);
};

var articleLink = ".articleContent a";

RssFeed.compileItem = function(template, item){
    var source = template.html();
    var template = Handlebars.compile(source);
    return template(item);
}

RssFeed.addItem = function(title, image, posturl, count, tag, description) {
    var itemTemplate = $("#item-template");
    var itemList = $("#main");
    var itemObject = {
        title: title,
        image: image,
        url: posturl,
        count: count,
        tag: tag,
        description: description
    };
    var compileItem = RssFeed.compileItem(itemTemplate, itemObject);
    itemList.append(compileItem);
}

var diggLoadFeed = function() {
    var diggUrl = feedPrefix + feedList[0];

    var diggRequest = $.ajax({
        url: diggUrl
    });

    diggRequest.done(function(diggFeed) {        

        var diggItem = diggFeed.data.feed;

        for (var i = 0; i < diggItem.length; i++) {
            var baseItem = diggItem[i];
            var itemTitle = baseItem.content.title;
            var itemImage = baseItem.content.media.images[0].original_url;
            var itemUrl = baseItem.content.url;
            var itemCount = baseItem.diggs.count;
            var itemDescription = baseItem.content.description;
            for (var j = 0; j < baseItem.content.tags.length; j++) {
                var tagArray = [];
                var newTag = baseItem.content.tags[j].display_name;
                tagArray.push(newTag);
            }
            var itemTags = tagArray.join(" ");
            RssFeed.addItem(itemTitle, itemImage, itemUrl, itemCount, "Digg", itemDescription);
        }

        displayFeedName("Digg");

        hideOverlay();

        console.log("dFeed: ", diggFeed);
    });
};

var mashLoadFeed = function() {
    var mashUrl = feedPrefix + feedList[1];
    
    var mashRequest = $.ajax({
        url: mashUrl
    });

    mashRequest.done(function(mashFeed) {

        var mashItem = mashFeed.new;

        for (var i = 0; i < mashItem.length; i++) {
            var baseItem = mashItem[i];
            var itemTitle = baseItem.title;
            var itemImage = baseItem.responsive_images[3].image;
            var itemUrl = baseItem.link;
            var itemCount = baseItem.shares.total;
            var itemDescription = baseItem.excerpt;
            // for (var j = 0; j < baseItem.content.tags.length; j++) {
            //     var tagArray = [];
            //     var newTag = baseItem.content.tags[j].display_name;
            //     tagArray.push(newTag);
            // }
            // var itemTags = tagArray.join(" ");
            RssFeed.addItem(itemTitle, itemImage, itemUrl, itemCount, "Mashable", itemDescription);
        }

        displayFeedName("Mashable New");

        hideOverlay();

        console.log("mFeed: ", mashFeed);
    });
};

var redditLoadFeed = function() {
    var redditUrl = feedPrefix + feedList[2];

    var redditRequest = $.ajax({
        url: redditUrl
    });

    redditRequest.done(function(redditFeed) {

        var redditItem = redditFeed.data.children;

        for (var i = 0; i < redditItem.length; i++) {
            var baseItem = redditItem[i];
            var itemTitle = baseItem.data.title;
            var itemImage = baseItem.data.thumbnail;
            var itemUrl = baseItem.data.url;
            var itemCount = baseItem.data.score;
            // var itemDescription = baseItem.content.description;
            RssFeed.addItem(itemTitle, itemImage, itemUrl, itemCount, "Reddit");
        }

        displayFeedName("Reddit");

        hideOverlay();

        console.log("rFeed: ", redditFeed);

    });   
};

// var lifehackerLoadFeed = function() {

//     var lifeUrl = feedPrefix + feedList[3];

//     var requestLife = $.ajax({
//         url: lifeUrl,
//         dataType: "xml"
//     });

//     requestLife.done(function(lifeFeed) {
//         var lifeItem = $(lifeFeed).find("item");

//         for (var i = 0; i < lifeItem.length; i++) {
//             var baseItem = lifeItem[i];
//             var itemTitle = $(baseItem).find("title").text();
//             var itemImage = $(baseItem).find("description");
//             // var imgHtml = $.parseHTML(itemImage);
//             // var newHtml = $(imgHtml.text();
//             // var itemUrl = baseItem.data.url;
//             // var itemCount = baseItem.data.score;
//             console.log("img: ", itemImage);
//         } 

//     });

// };


$(document).ready(function() {

    showLoader();

    // load default feed
    diggLoadFeed();

	// show Digg feed on click
    $(document).on("click", "#diggLink", function(){
        $("#main").html("");
        showLoader();
        diggLoadFeed();
    });


	// show Mashable feed on click
    $(document).on("click", "#mashableLink", function(){
        $("#main").html("");
        showLoader();
        mashLoadFeed();
    });


    // show Reddit feed on click
    $(document).on("click", "#redditLink", function(){
        $("#main").html("");
        showLoader();
        redditLoadFeed();
    });

    $(document).on("click", ".closePopUp", function(){
        hideOverlay();
    });

    $(document).on("click", "#searchBtn", function(){
        toggleSearch();
        console.log("Search");
    });

    $(document).on("keydown", function(e){
        if (e.which == 13) {
            toggleSearch();
            console.log("Enter");
            console.log("---------------------------");
        }
    });

    $(document).on("click", articleLink, function(e){
        e.preventDefault();
        var articleWrap = $(this).parents(".article");
        var artTitle = articleWrap.find("h3").text();
        var artDescription = articleWrap.data("description");
        var artUrl = articleWrap.data("url");
        refillPopUp(artTitle, artDescription, artUrl);
        showDetails();
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 27) hideOverlay();   // esc
    });

});
