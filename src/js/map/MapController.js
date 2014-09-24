(function () {
    'use strict';
    angular.module('app.map').controller('MapController', function ($scope, $ionicModal, leafletData, Places, $ionicSideMenuDelegate) {

        var filter = "all";

        $scope.setFilter = function(fil){
            filter = fil;
            $scope.markers = [];
            places.forEach(function (place) {
                if (!place.lat || !place.lng) return false;
                if (place.type_id == filter || filter == "all") {
                    $scope.markers[place.id] = {
                        lat: place.lat,
                        lng: place.lng,
                        focus: true,
                        draggable: false,
                        icon: _.find($scope.types, {id: place.type_id}).icon
                    };
                }
            });
        };

        $scope.title = '<i class="icon-winks-left"></i>Map<i class="icon-winks-right"></i>';

        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.defaults = {
            //tileLayer: 'img/tiles/{z}/{x}/{y}.jpg',
            tileLayerOptions: {
                //maxNativeZoom : 14
            },
            //tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            tileLayer: "https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png",
            minZoom: 12

        };


        $ionicModal.fromTemplateUrl('detail/template.html', {
            scope: $scope,
            animation: 'rotate3D'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        var places = Places.getPlaces();

        $scope.types = Places.getTypes();


        $scope.center = {
            lat: 51.221002,
            lng: 4.419770,
            zoom: 15
        };

        $scope.markers = {};

        //$scope.maxBounds = Places.getMaxBounds();

        places.forEach(function (place) {
            if (!place.lat || !place.lng) return false;
            if (place.type_id == filter || filter == "all") {
                $scope.markers[place.id] = {
                    lat: place.lat,
                    lng: place.lng,
                    focus: true,
                    draggable: false,
                    icon: _.find($scope.types, {id: place.type_id}).icon
                };
            }
        });

        $scope.$on('leafletDirectiveMarker.click', function (e, args) {
            $scope.place = Places.findPlace(parseInt(args.markerName));
            $scope.modal.show();
        });

        var tempMap;

        $scope.yourLocation = function(){
           if(!$scope.markers["own"]) return false;
            tempMap.panTo([$scope.markers["own"].lat, $scope.markers["own"].lng]);
        };

        leafletData.getMap().then(function (map) {
            tempMap = map;
            map.invalidateSize();
            map.locate({watch: true})
                .on('locationfound', function (e) {
                    $scope.markers["own"] = {
                        lat: e.latitude,
                        lng: e.longitude,
                        focus: true,
                        clickable: false,
                        draggable: false,
                        icon : {
                            iconUrl: 'img/your-location.png',
                            iconSize:     [48, 48],
                            iconAnchor:   [24, 35]
                        }
                    };
                    $scope.$apply();
                })
                .on('locationerror', function (e) {
                    console.log(e);
                });
        });
    });
})();