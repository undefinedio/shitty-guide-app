(function () {
    'use strict';
    angular.module('app.guide', []);
    angular.module('app.guide').config(function($stateProvider){
        $stateProvider
            .state('tab.guide', {
                url: "/guide",
                views: {
                    'tab-guide': {
                        templateUrl: 'guide/template.html',
                        controller: 'GuideController'
                    }
                }
            });
    });
})();