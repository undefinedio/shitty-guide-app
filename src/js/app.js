(function () {
    var dependencies = [
        'ionic',
        'templates',
        'app.list',
        'app.places',
        'app.guide',
        'app.map'
    ];
    angular.module('app', dependencies);

    //see if we are running on a dev machine or on a cordova app
    angular.module('app').constant('development', typeof window.cordova == 'undefined');

    angular.module('app').run(function (start) {
        start.run();
    });

})();