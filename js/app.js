// MODEL
var model = {
  locations: [
    {
      title: 'A Chapa Hamburgers', 
      location: {lat: -23.5754431, lng: -46.6226764}, 
      placeId: 'ChIJ_bFrm8tZzpQRSclyzDinrV0',
      marker: [],
      current: false,
      category: 'burgers'
    },
    {
      title: '1900 Pizzeria', 
      location: {lat: -23.5945148, lng: -46.6420329}, 
      placeId: 'ChIJ0zuA8SVazpQRaGnZGc3EVn4',
      marker: [],
      current: false,
      category: 'pizza'
    },
    {
      title: 'Vila Grano Paes', 
      location: {lat: -23.5972376, lng: -46.640349}, 
      placeId: 'ChIJOddf3S9azpQRwZI-YDP8wSY',
      marker: [],
      current: false,
      category: 'bakery'
    },
    {
      title: 'O Brazeiro', 
      location: {lat: -23.6042015, lng: -46.6357551}, 
      placeId: 'ChIJhR2ryDVazpQRzNksnLcqagA',
      marker: [],
      current: false,
      category: 'brazilian'
    },
    {
      title: 'Charles Pizzaria', 
      location: {lat: -23.6159849, lng: -46.6434456}, 
      placeId: 'ChIJI_rvBUVazpQRyf17kS3uQgE',
      marker: [],
      current: false,
      category: 'pizza'
    },
    {
      title: 'Tanka', 
      location: {lat: -23.555263, lng: -46.635161}, 
      placeId: 'ChIJL7T4G6lZzpQR1pzauoGi1gI',
      marker: [],
      current: false,
      category: 'japanese'
    },
    {
      title: 'Espaco Kazu', 
      location: {lat: -23.557874, lng: -46.63553}, 
      placeId: 'ChIJMZ9an6hZzpQRUrj4GXD11t8',
      marker: [],
      current: false,
      category: 'japanese'
    },
    {
      title: 'Korea House', 
      location: {lat: -23.5559502, lng: -46.6352005}, 
      placeId: 'ChIJ045q5KhZzpQRpKqzA6f3mvg',
      marker: [],
      current: false,
      category: 'korean'
    },
    {
      title: 'Iroha', 
      location: {lat: -23.6095318, lng: -46.6371273}, 
      placeId: 'ChIJITqnZklazpQRhVgx6_Auw-o',
      marker: [],
      current: false,
      category: 'japanese'
    }
  ]
};

var FavoritePlace = function(data) {
  this.title = ko.observable(data.title);
  this.location = ko.observable(data.location);
  this.placeId = ko.observable(data.placeId);
  this.marker = ko.observableArray(data.marker);
  this.current = ko.observable(data.current);
  this.category = ko.observable(data.category);
}
// drawer menu for small screens
var menu = document.querySelector('#menu');
var main = document.querySelector('main');
var drawer = document.querySelector('.nav');
menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});
main.addEventListener('click', function() {
  drawer.classList.remove('open');
});


var Category = function(data) {
  this.category = ko.observable(data.category);
}

var map;
var markers = [];
var polygon = null;
var placeMarkers = [];
var defaultIcon = null;
var highlightedIcon = null;
var largeInfowindow = null;

function initMap() {

	var styles = [
	  {
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#ebe3cd"
		  }
		]
	  },
	  {
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#523735"
		  }
		]
	  },
	  {
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#f5f1e6"
		  }
		]
	  },
	  {
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#c9b2a6"
		  }
		]
	  },
	  {
		"featureType": "administrative.land_parcel",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#dcd2be"
		  }
		]
	  },
	  {
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#ae9e90"
		  }
		]
	  },
	  {
		"featureType": "landscape.natural",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#dfd2ae"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#dfd2ae"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#93817c"
		  }
		]
	  },
	  {
		"featureType": "poi.business",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#ffeb3b"
		  }
		]
	  },
	  {
		"featureType": "poi.medical",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#ff2e28"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#a5b076"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#447530"
		  }
		]
	  },
	  {
		"featureType": "poi.school",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#0080ff"
		  }
		]
	  },
	  {
		"featureType": "poi.sports_complex",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#ffff00"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#f5f1e6"
		  }
		]
	  },
	  {
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#fdfcf8"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#f8c967"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#e9bc62"
		  }
		]
	  },
	  {
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#e98d58"
		  }
		]
	  },
	  {
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#db8555"
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#806b63"
		  }
		]
	  },
	  {
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#dfd2ae"
		  }
		]
	  },
	  {
		"featureType": "transit.line",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#8f7d77"
		  }
		]
	  },
	  {
		"featureType": "transit.line",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#ebe3cd"
		  }
		]
	  },
	  {
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#dfd2ae"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
		  {
			"color": "#b9d3c2"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#92998d"
		  }
		]
	  }
	];

	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -23.5994071, lng: -46.6373353},
	  zoom: 13,
	  styles: styles,
	  mapTypeControl: false
	});
	largeInfowindow = new google.maps.InfoWindow();
	defaultIcon = makeMarkerIcon('232afa');
	highlightedIcon = makeMarkerIcon('7cff24');
	for (var i = 0; i < model.locations.length; i++) {
	  createMarker(model.locations[i]);
	}
	showMarkers();
}


// Error Handlers
function googleMapsApiError() 
{
	$('#map').html('<br> <h1>Error in Google Maps API</h1>')
};

function gm_authFailure() 
{
	$('#map').html('<br> <h1>Please check your GOGGLE_MAPS_API_KEY.</h1>')
};
// Markers functions are credited to Udacity lessons
  function createMarker(location) {
	var position = location.location;
	for (var key in position) {
	  this[key] = position[key];
	}
	var title = location.title;
	var placeId = location.placeId;
	var marker = new google.maps.Marker({
	  position: position,
	  title: title,
	  animation: google.maps.Animation.DROP,
	  icon: defaultIcon,
	  id: placeId, 
	  lat:lat, 
	  lng: lng
	});
	location.marker.push(marker);
	markers.push(marker);
	marker.addListener('click', function() {
	  getPlacesDetails(this, largeInfowindow)
	});
	marker.addListener('mouseover', function() {
	  this.setIcon(highlightedIcon);
	});
	marker.addListener('mouseout', function() {
	  this.setIcon(defaultIcon);
	});
  }


  function showMarkers() {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	  bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
	if (map.getZoom() > 18) {
	  map.setZoom(18);
	}
  }

  function hideMarkers(markers) {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(null);
	}
  }

  function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
	  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
	  '|40|_|%E2%80%A2',
	  new google.maps.Size(21, 34),
	  new google.maps.Point(0, 0),
	  new google.maps.Point(10, 34),
	  new google.maps.Size(21,34));
	return markerImage;
  }

  function getPlacesDetails(marker, infowindow) {
      markers.forEach(function(marker) {
        marker.setAnimation(null);
        marker.setIcon(defaultIcon)
      });
      var service = new google.maps.places.PlacesService(map);
	  var latitude = marker.lat;
	  var longitude = marker.lng;
	  
		var yelpString = '';
		var YOUR_YELP_API_KEY = 'Gvs2ZYNvVHgAQ4fgR3iQ1KhCMxw5LCJ8LsfVG9HE4098aa28fyWa2jzRoxsG-wN3Yk-KEya5B_FUmI3_T5vin22re62JwpOMpDxViwHrFq3Yy32VEqIn1K1XGukjXXYx';
		var yelpURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&radius=10&latitude=' + latitude + '&longitude=' + longitude
		$.ajax({
		  url: yelpURL,
		  headers: {
			"Authorization": "Bearer " + YOUR_YELP_API_KEY
		  },
		  "cors": {
			"headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
		  },
		  'cache': true,
		  dataType: 'json',
		  success: function(data) {
			if (data.businesses[0].categories != null) {
			  yelpString += '<br><br><strong>Categories:</strong><br>';
			  for (var i=0; i<data.businesses[0].categories.length; i++ ) {
				yelpString += data.businesses[0].categories[i].title + '<br>';
			  }
			}
			if (data.businesses[0].rating != null) {
			  yelpString += '<br><strong>Rating:</strong><br>';
			  yelpString += data.businesses[0].rating + '<br>';
			}
			if (data.businesses[0].price != null) {
			  yelpString += '<br><strong>Price:</strong><br>';
			  yelpString += data.businesses[0].price + '<br>';
			}
			if (data.businesses[0].image_url) {
			  yelpString += '<br><br><img src="' + data.businesses[0].image_url + '" style="max-height: 100px; max-width: 200px;">';
			}
			service.getDetails({
			  placeId: marker.id
			}, function(place, status) {
			  if (status === google.maps.places.PlacesServiceStatus.OK) {
				infowindow.marker = marker;
				var innerHTML = '<div>';
				if (place.name) {
				  innerHTML += '<strong>' + place.name + '</strong>';
				}
				if (place.formatted_address) {
				  innerHTML += '<br>' + place.formatted_address;
				}
				if (place.formatted_phone_number) {
				  innerHTML += '<br>' + place.formatted_phone_number;
				}
				innerHTML += yelpString;
				/*
				if (place.photos) {
				  innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
					  {maxHeight: 100, maxWidth: 200}) + '">';
				}
				*/
				innerHTML += '</div>';
				infowindow.setContent(innerHTML);
				infowindow.open(map, marker);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				marker.setIcon(highlightedIcon);

				infowindow.addListener('closeclick', function() {
				  infowindow.marker = null;
				});
			  } else {
				var innerHTML = '<div> <h1 style="color:#FF0000";>Error in Google Maps request! </h1></div>';
				infowindow.setContent(innerHTML);
				infowindow.open(map, marker);
			  }
			});
		},
			error: function(data) {
				var innerHTML = '<div> <h1 style="color:#FF0000";>Error in Yelp request! </h1></div>';
				infowindow.setContent(innerHTML);
				infowindow.open(map, marker);
			}
		})
    

	// alternative to Yelp call

	/*
	var foursquareSearchURL = 'https://api.foursquare.com/v2/venues/search?ll=' + latitude + ',' + longitude +
	       '&client_id=W4YU1GJPKZDBD5IBLYY3TIIYWLTBJ2YG1XLJUDX4C2QZHKWO&client_secret=SP4ZJF00DNY4A21CHNEKCABX5XCKJCH41W2XVWKKYEF5EGUA&v=20160118&limit=5'

		 console.log(foursquareSearchURL)
         var venueId ='';
         var foursquareString ='';
      $.getJSON(foursquareSearchURL, function( data ) {
          //for (var i = 0; i < data.response.venues.length; i++) {
            venueId = data.response.venues[0].id;
            //foursquareString += data.response.venues[i].name  + '<br>';
            console.log(data)
            console.log(venueId)
          //}

          var foursquareVenueURL = 'https://api.foursquare.com/v2/venues/' + venueId + 
          '?client_id=W4YU1GJPKZDBD5IBLYY3TIIYWLTBJ2YG1XLJUDX4C2QZHKWO&client_secret=SP4ZJF00DNY4A21CHNEKCABX5XCKJCH41W2XVWKKYEF5EGUA&v=20160118'
    
    
             //var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + latitude + ',' + longitude +
        //      '&client_id=W4YU1GJPKZDBD5IBLYY3TIIYWLTBJ2YG1XLJUDX4C2QZHKWO&client_secret=SP4ZJF00DNY4A21CHNEKCABX5XCKJCH41W2XVWKKYEF5EGUA&v=20160118&categoryId=4c38df4de52ce0d596b336e1&limit=5'
        console.log(foursquareVenueURL)
        //categoryId=4c38df4de52ce0d596b336e1
        var parkingPlaces = [];
        
          $.getJSON(foursquareVenueURL, function( data ) {
              //for (var i = 0; i < data.response.venues.length; i++) {
              //  var response = data.response.venues[i];
              //  foursquareString += data.response.venues[i].name  + '<br>';
              //  parkingPlaces.push(response);
                console.log(data)
                console.log(data.response.venue.price)
                //console.log(data.response.venue.price.tier)
                if (data.response.venue.price != null) {
                  for (var i=0; i<data.response.venue.price.tier; i++ ) {
                    foursquareString += data.response.venue.price.currency;
                  }
                  foursquareString += " " + data.response.venue.price.message  + '<br>';
                } else {
                  foursquareString += 'sem avaliacoes <br>';
                }

                console.log(foursquareString)

                service.getDetails({
                  placeId: marker.id
                }, function(place, status) {
                  console.log('place')
                  console.log(place)
                  console.log(place.geometry.location.lat)
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Set the marker property on this infowindow so it isn't created again.
                    infowindow.marker = marker;
                    var innerHTML = '<div>';
                    if (place.name) {
                      innerHTML += '<strong>' + place.name + '</strong>';
                    }
                    if (place.formatted_address) {
                      innerHTML += '<br>' + place.formatted_address;
                    }
                    if (place.formatted_phone_number) {
                      innerHTML += '<br>' + place.formatted_phone_number;
                    }
                    innerHTML += '<br><br><strong>Price:</strong><br>';
                    innerHTML += foursquareString;
                    if (place.photos) {
                      innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                          {maxHeight: 100, maxWidth: 200}) + '">';
                    }
                    innerHTML += '</div>';
                    infowindow.setContent(innerHTML);
                    infowindow.open(map, marker);
                    // Make sure the marker property is cleared if the infowindow is closed.
                    infowindow.addListener('closeclick', function() {
                      infowindow.marker = null;
                    });
                  }
                });
          }).fail(function(){
              alert("A API do Foursquare retornou com falha. Favor tentar novamente.");
          });
      }).fail(function(){
          alert("A API do Foursquare retornou com falha. Favor tentar novamente.");
    });
    */
    
  }

var ViewModel = function() {
  var self = this;

  this.favoritePlacesList = ko.observableArray([]);
  model.locations.forEach(function(location) {
    self.favoritePlacesList.push( new FavoritePlace(location));
  })

  this.choices = ['all', 'bakery', 'brazilian', 'burgers', 'japanese', 'korean', 'pizza'];
  this.selectedChoice = ko.observable("all");

  this.selectedChoice.subscribe(function(newValue) {
      model.locations.forEach(function(location) {
        self.favoritePlacesList.pop();
      })
      hideMarkers(markers);
      largeInfowindow.close();
      markers=[];
      model.locations.forEach(function(location) {
        if (location.category === newValue || newValue == 'all') {
          self.favoritePlacesList.push( new FavoritePlace(location));
          createMarker(location)
        }
      })
      showMarkers();
  });

  this.chosenSelection = ko.observable();

  this.locationClick = function(clickedLocation) {
    getPlacesDetails(clickedLocation.marker()[0], largeInfowindow)
	drawer.classList.remove('open');
  }
}

ko.applyBindings(new ViewModel());

