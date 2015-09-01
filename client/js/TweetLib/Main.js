require([
    'TweetLib/AppManager',
    'dojo/domReady!'
], function(
    AppManager
) {
    var appManager = new AppManager();
    window.am = appManager;
    console.log("Ready!");
});
