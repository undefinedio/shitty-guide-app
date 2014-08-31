(function () {
    'use strict';
    angular.module('app.map').controller('MapController', function ($scope, $ionicModal ,  leafletData, Places) {
        $scope.defaults = {
            tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            minZoom: 11
        };

        $ionicModal.fromTemplateUrl('detail/template.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        var places = Places.getPlaces();

        $scope.center = {
            lat: Places.getPlaces()[0].lat,
            lng: Places.getPlaces()[0].lng,
            zoom: 11
        };

        $scope.markers = {};

        places.forEach(function (place) {
            if (!place.lat || !place.lng) return false;
            $scope.markers[place.id] = {
                lat: place.lat,
                lng: place.lng,
                focus: true,
                draggable: false
            }
        });


        $scope.$on('leafletDirectiveMarker.click', function (e, args) {
            $scope.place = Places.findPlace(parseInt(args.markerName));
            $scope.modal.show();
        });

        leafletData.getMap().then(function (map) {
            console.log(map);
            map.invalidateSize();
        });
    });
})();