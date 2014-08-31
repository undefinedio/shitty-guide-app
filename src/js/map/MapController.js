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
            lat: 1,
            lng: 1,
            zoom: 11
        };

        $scope.markers = {};

        $scope.maxBounds = Places.getMaxBounds();

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
            map.invalidateSize();
            map.locate({watch: true})
                .on('locationfound', function(e){
                    $scope.markers["own"] = {
                        lat: e.latitude,
                        lng:  e.longitude,
                        focus: true,
                        clickable: false,
                        draggable: false
                    };
                    $scope.$apply();
                })
                .on('locationerror', function(e){
                    console.log(e);
                });
        });
    });
})();