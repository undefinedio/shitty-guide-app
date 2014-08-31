(function () {
    'use strict';
    angular.module('app.list', []);
    angular.module('app.list').config(function($stateProvider){
        $stateProvider
            .state('tab.list', {
                url: "/list",
                views: {
                    'tab-list': {
                        templateUrl: 'list/template.html',
                        controller: 'ListController'
                    }
                }
            });
    });
})();