(function () {
    angular.module('app.places').factory('Places', function ($http, $q) {
        var service = {};

        var self = service;

        service._places = [];

        service._maxBounds = {
            'northEast': undefined, // highest
            'southWest': undefined
        };


        service._neighbourhoods = [];
        service._types = [];


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
                        if (post['taxonomy_shitty-type'][0]) self._types.push(post['taxonomy_shitty-type'][0]);

                        if (post.custom_fields.hasOwnProperty('pic') && post.custom_fields.pic != '') {
                            picId = post.custom_fields.pic;

                            postPic = _.find(post.attachments, function (attachment) {
                                return attachment.id == picId;
                            });

                            post.pic = postPic.images.medium.url;
                        }

                        console.log(post);

                        return {
                            id: parseInt(post.id),
                            slug: post.slug,
                            modalTitle: '<i class="icon-winks-left"></i>' + post.title + '<i class="icon-winks-right"></i>',
                            title: post.title,
                            content: post.content,
                            location: (Array.isArray(post.custom_fields.location) ? post.custom_fields.location[0] : post.custom_fields.location),
                            lat: parseFloat(post.custom_fields.lat),
                            lng: parseFloat(post.custom_fields.lng),
                            pic: post.pic,
                            neighbourhood_id: parseInt(post.taxonomy_neighbourhood[0].id),
                            type_id: (post['taxonomy_shitty-type'][0] ? parseInt(post['taxonomy_shitty-type'][0].id) : undefined),
                            type_title: (post['taxonomy_shitty-type'][0] ? post['taxonomy_shitty-type'][0].title : undefined)
                        }
                    });
                    self._neighbourhoods = _.uniq(self._neighbourhoods, function (n) {
                        return n.id
                    });
                    self._types = _.uniq(self._types, function (n) {
                        return n.id
                    });
                    posts.forEach(function (post) {
                        var neighbourhood = _.find(self._neighbourhoods, { 'id': post.neighbourhood_id});
                        if (!neighbourhood.places) neighbourhood.places = [];
                        neighbourhood.places.push(post);
                        if (!self._maxBounds.northEast) {
                            self._maxBounds.northEast = {};
                            self._maxBounds.northEast.lat = post.lat;
                            self._maxBounds.northEast.lng = post.lng;
                        } else {
                            if (post.lat > self._maxBounds.northEast.lat) self._maxBounds.northEast.lat = post.lat;
                            if (post.lng > self._maxBounds.northEast.lng) self._maxBounds.northEast.lng = post.lng;
                        }

                        if (!self._maxBounds.southWest) {
                            self._maxBounds.southWest = {};
                            self._maxBounds.southWest.lat = post.lat;
                            self._maxBounds.southWest.lng = post.lng;
                        } else {
                            if (post.lat < self._maxBounds.southWest.lat) self._maxBounds.southWest.lat = post.lat;
                            if (post.lng < self._maxBounds.southWest.lng) self._maxBounds.southWest.lng = post.lng;
                        }

                        self._maxBounds.northEast.lat += 0.0005;
                        self._maxBounds.northEast.lng += 0.0005;

                        self._maxBounds.southWest.lat -= 0.0005;
                        self._maxBounds.southWest.lng -= 0.0005;

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

        service.getTypes = function () {
            self._types.forEach(function(type){
                type.icon  = {
                    iconUrl: 'img/icons/type-'+type.id+'.png',
                    iconSize:     [48, 48],
                    iconAnchor:   [24, 35]
                };
            });

            return self._types;
        };

        service.getNeighborhoods = function () {
            return self._neighbourhoods;
        };

        service.findPlace = function (placeId) {
            return _.find(self._places, { 'id': placeId});
        };

        service.getMaxBounds = function () {
            return self._maxBounds;
        };

        return service;
    });

})();