(function () {
    angular.module('app.places').factory('Places', function ($http, $q ) {
        var service = {};

        var self = service;

        service._places = [];


        service.getAllNeighbourhoods = function(defered){

        };

        service.getAllPlaces = function(deferred){
           deferred = deferred || $q.defer();
            $http({
                type: "GET",
                url: "http://shittyguide.org",
                params: {
                    json: 'get_posts',
                    post_type : 'place',
                    count : -1
                },
                // move this to some place
                transformResponse: function(data){
                    data = JSON.parse(data);
                    var posts = data.posts.map(function(post){
                        return {
                            id : post.id,
                            title: post.title,
                            content : post.content,
                            neighbourhood_id : post.taxonomy_neighbourhood.id
                        }
                    });
                    return posts;
                }
            }).success(function (places) {
                console.log(places);
                self._places = places;
                deferred.resolve(places);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };

        return service;
    });
})();