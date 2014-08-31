(function () {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {

        //default url
        $urlRouterProvider.otherwise("/tab/list");

        //setup abstract tab route
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: 'tabs/template.html',
                controller: "TabsController",
                resolve: {
                    start: function (start) {
                        return start.promise();
                    }
                }
            });
    });
})();
