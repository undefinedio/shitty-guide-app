(function () {
    angular.module('app.places').factory('Places', function ($http, $q) {
        var service = {};

        var self = service;

        service._places = [];


        service._neighbourhoods = [];


        service.FetchAllPlaces = function (deferred) {
            deferred = deferred || $q.defer();
            $http({
                type: "GET",
                url: "http://shittyguide.org",
                params: {
                    json: 'get_posts',
                    post_type: 'place',
                    count: -1
                },
                // move this to some place
                transformResponse: function (data) {
                    data = JSON.parse(data);
                    var posts = data.posts.map(function (post) {
                        self._neighbourhoods.push(post.taxonomy_neighbourhood[0]);
                        return {
                            id: parseInt(post.id),
                            slug: post.slug,
                            title: post.title,
                            content: post.content,
                            lat: parseFloat(post.custom_fields.lat),
                            lng: parseFloat(post.custom_fields.lng),
                            neighbourhood_id: parseInt(post.taxonomy_neighbourhood[0].id)
                        }
                    });
                    self._neighbourhoods = _.uniq(self._neighbourhoods, function(n){return n.id});
                    posts.forEach(function(post){
                        var neighbourhood = _.find(self._neighbourhoods, { 'id' : post.neighbourhood_id});
                        if(!neighbourhood.places) neighbourhood.places = [];
                        neighbourhood.places.push(post);
                    });
                    return posts;
                }
            }).success(function (places) {

                self._places = places;
                console.log(self);
                deferred.resolve(places);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };

        service.getPlaces = function () {
            return self._places;
        };

        service.getNeighborhoods = function () {
            return self._neighbourhoods;
        };

        service.findPlace = function (placeId) {
            return _.find(self._places, { 'id': placeId});
        };

        return service;
    });

})();