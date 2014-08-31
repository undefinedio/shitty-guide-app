(function () {
    'use strict';
    angular.module('app.map').controller('MapController', function ($scope) {
        $scope.defaults = {
            minZoom: 8
        };

        $scope.center = {
            lat: 51.505,
            lng: -0.09,
            zoom: 8
        };

        $scope.markers = {

        };
    });
})();