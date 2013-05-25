(function($) {
    var template = Handlebars.compile(document.getElementById('tpl-list').innerHTML);

    var $map = $('#map').css({
        position: 'absolute',
        left: 0,
        bottom: '-490px'
    });
    var $list = $('#main');
    var canvas = document.getElementById('map-object');
    var container = document.getElementById('main');
    var map = new google.maps.Map(canvas, {
        center: new google.maps.LatLng(0,0),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var myposition;

    if (!navigator.geolocation) {
        container.innerHTML = 'Enable geo location';
        return;
    }

     console.log("ASDASD")
    // Geolocation
    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log('success');
            container.innerHTML = position.coords.latitude;
            map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            Backbone.history.start()
            getPlaces();
        },
        function (position) {
            console.log('error', position.code, position.message);
            container.innerHTML = "Failed to get your current location";
        },
        {
            timeout: 5000
        }
    );

    $('button.close').on('click', function(e) {
        window.location.hash = '';
    });

    function getPlaces() {
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: map.getCenter(),
            openNow: true,
            radius: 500,
        }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var items = [], item;
                for (var i = 0; i < 3; i++) {
                    item = results[i];
                    if (item) {
                        var photo = item.icon;
                        if (item.photos) {
                            photo = item.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35});
                        }

                        items.push({
                            img: {
                                src: photo,
                                name: item.name
                            },
                            lat: item.geometry.location.lat(),
                            lng: item.geometry.location.lng(),
                            name: item.name,
                            open: item.open_now,
                            types: item.types.map(humanizeString).slice(0,1).join(', ')
                        });
                    }
                }
                $list.html(template({items: items}));
            }
        });
    }

    var directionsDisplay = new google.maps.DirectionsRenderer();

    var Router = Backbone.Router.extend({
        directionsService : new google.maps.DirectionsService(),
        routes: {
            'place/:pos': 'place',
            '': 'home'
        },

        place: function(pos) {
            var lat = pos.split(',')[0];
            var lng = pos.split(',')[1];

            if (lat && lng) {
                var center = map.getCenter();
                var destination = new google.maps.LatLng(lat, lng);
                var origin = new google.maps.LatLng(center.lat(), center.lng());
                var directionRequest = {
                    origin: origin,
                    destination: destination,
                    provideRouteAlternatives: false,
                    travelMode: google.maps.TravelMode.WALKING,
                    unitSystem: google.maps.UnitSystem.METRIC
                };
                directionsDisplay.setMap(map);
                this.directionsService.route(directionRequest, this.renderDirection);
            }
            $map.css({
                position: 'absolute',
                bottom: null,
                top: 10
            });
        },

        renderDirection: function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        },

        home: function() {
            console.log('yeah');
            $map.css({
                position: 'absolute',
                bottom: '-490px',
                top: 'auto'
            });
        }
    });
    var appRouter = new Router;

    function cap(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    function humanizeString(string) {
        return string.split('_').map(cap).join(' ');
    }
})(jQuery);
