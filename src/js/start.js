(function () {
    'use strict';
    angular.module('app').factory('start', function ($ionicPlatform, $q, Places) {
        var deferred = $q.defer();
        return {
            promise: function () {
                return deferred.promise;
            },
            run: function () {
                var self = this;
                Places.FetchAllPlaces(deferred);

                $ionicPlatform.ready(function () {
                    self.setUpIonic();

                    //deferred.resolve();
                });
            },
            setUpIonic: function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            }
        };
    });
})();