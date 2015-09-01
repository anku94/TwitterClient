require([
    'TweetLib-Dojo/AppManager',
    'dojo/domReady!'
], function(
    AppManager
) {
    var appManager = new AppManager();
    window.am = appManager;
    console.log("Ready!");
});
