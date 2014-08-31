(function(){
    angular.module('app.map', ['leaflet-directive']).config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('tab.map', {
                url : "/map",
                views : {
                    'tab-map' : {
                        templateUrl : 'map/template.html',
                        controller : 'MapController'
                    }
                }
            });
    });
})();