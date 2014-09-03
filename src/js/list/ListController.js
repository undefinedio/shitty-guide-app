(function () {
    'use strict';
    angular.module('app.list').controller('ListController', function ($scope, $ionicModal, Places) {
        $scope.title = '<i class="icon-winks-left"></i>Places<i class="icon-winks-right"></i>'


        $scope.neighborhoods = Places.getNeighborhoods();

        $ionicModal.fromTemplateUrl('detail/template.html', {
            scope: $scope,
            animation: 'skew'
        }).then(function (modal) {
            $scope.modal = modal;
        });


        $scope.openPlace = function (place) {
            $scope.place = place;
            $scope.modal.show();
        }
    });
})();