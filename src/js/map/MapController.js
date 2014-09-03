(function () {
    'use strict';
    angular.module('app.map').controller('MapController', function ($scope, $ionicModal ,  leafletData, Places, $ionicSideMenuDelegate) {
        $scope.title = '<i class="icon-winks-left"></i>Map<i class="icon-winks-right"></i>'

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.defaults = {
            tileLayer: 'img/tiles/{z}/{x}/{y}.jpg',
            tileLayerOptions: {
                //maxNativeZoom : 14
            },
            //tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            minZoom: 11,
            maxZoom: 16
        };


        $ionicModal.fromTemplateUrl('detail/template.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        var places = Places.getPlaces();

        $scope.types = Places.getTypes();

        $scope.center = {
            lat: 51.212664,
            lng: 4.406837,
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
            console.log($scope.place);
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