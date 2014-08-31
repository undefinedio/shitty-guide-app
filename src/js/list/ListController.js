(function () {
    'use strict';
    angular.module('app.list').controller('ListController', function ($scope, $ionicModal ,  Places) {
        $scope.neighborhoods = Places.getNeighborhoods();
        $ionicModal.fromTemplateUrl('detail/template.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });


        $scope.openPlace = function(place){
            console.log($scope);
            $scope.place = place;
            $scope.modal.show();
        }
    });
})();