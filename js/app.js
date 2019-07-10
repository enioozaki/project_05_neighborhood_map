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
      //location: {lat: -23.5945034, lng: -46.6422251}, 
      location: {lat: -23.5945148, lng: -46.6420329}, 
      placeId: 'ChIJ0zuA8SVazpQRaGnZGc3EVn4',
      marker: [],
      current: false,
      category: 'pizza'
    },
    {
      title: 'Vila Grano Paes', 
      //location: {lat: -23.5972949, lng: -46.6402278}, 
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
      //location: {lat: -23.6157234, lng: -46.6434492}, 
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
  /*
  this.title = ko.computed(function(){
      var title;
      var clicks = this.clickCount();
      if (clicks < 10) {
          title = 'NewBorn';
      } else if (clicks <20) {
          title= 'Infant';
      } else if (clicks <30) {
          title= 'Child';
      } else {
          title= 'Adult';
      }
      return title;
  }, this);
  */
}

var Category = function(data) {
  this.category = ko.observable(data.category);
}

var map;

// Create a new blank array for all the listing markers.
var markers = [];

// This global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;

// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
var placeMarkers = [];
var defaultIcon = null;
var highlightedIcon = null;
var largeInfowindow = null;

      function initMap() {
        // Create a styles array to use with the map.

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

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -23.5994071, lng: -46.6373353},
          zoom: 13,
          styles: styles,
          mapTypeControl: false
        });

        // This autocomplete is for use in the search within time entry box.
        ////var timeAutocomplete = new google.maps.places.Autocomplete(
        ////    document.getElementById('search-within-time-text'));
        // This autocomplete is for use in the geocoder entry box.
        /*
		var zoomAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('zoom-to-area-text'));
        // Bias the boundaries within the map for the zoom to area text.
        zoomAutocomplete.bindTo('bounds', map);
        // Create a searchbox in order to execute a places search
        var searchBox = new google.maps.places.SearchBox(
            document.getElementById('places-search'));
        // Bias the searchbox to within the bounds of the map.
        searchBox.setBounds(map.getBounds());

        // These are the place listings that will be shown to the user.
        // Normally we'd have these in a database instead.
		*/

        largeInfowindow = new google.maps.InfoWindow();

        /*
		// Initialize the drawing manager.
        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
          }
        });
		*/

        // Style the markers a bit. This will be our listing marker icon.
        defaultIcon = makeMarkerIcon('232afa');

        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        highlightedIcon = makeMarkerIcon('7cff24');

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < model.locations.length; i++) {
          createMarker(model.locations[i]);
          /*
          // Get the position from the location array.
          var position = model.locations[i].location;
          console.log('position')
          console.log(position)
          for (var key in position) {
            this[key] = position[key];
          }
          console.log(lat)
          console.log(lng)

          var title = model.locations[i].title;
          var placeId = model.locations[i].placeId;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            //id: i,
            id: placeId, 
			      lat:lat, 
			      lng: lng
          });
          console.log(marker)
			
		      model.locations[i].marker.push(marker);
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open the large infowindow at each marker.
          marker.addListener('click', function() {
            getPlacesDetails(this, largeInfowindow)
            //populateInfoWindow(this, largeInfowindow);
          });
          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
          */
        }

		showListings();
		/*
        document.getElementById('show-listings').addEventListener('click', showListings);
        document.getElementById('hide-listings').addEventListener('click', function() {
          hideMarkers(markers);
        });
		*/
		/*
        document.getElementById('toggle-drawing').addEventListener('click', function() {
          toggleDrawing(drawingManager);
        });
		*/
		/*
        document.getElementById('zoom-to-area').addEventListener('click', function() {
          zoomToArea();
        });
		*/

        //document.getElementById('search-within-time').addEventListener('click', function() {
        // searchWithinTime();
        //});

        // Listen for the event fired when the user selects a prediction from the
        // picklist and retrieve more details for that place.
        /*
		searchBox.addListener('places_changed', function() {
          searchBoxPlaces(this);
        });
		*/

        // Listen for the event fired when the user selects a prediction and clicks
        // "go" more details for that place.
        /*
		document.getElementById('go-places').addEventListener('click', textSearchPlaces);
		*/

        // Add an event listener so that the polygon is captured,  call the
        // searchWithinPolygon function. This will show the markers in the polygon,
        // and hide any outside of it.
        /*
		drawingManager.addListener('overlaycomplete', function(event) {
          // First, check if there is an existing polygon.
          // If there is, get rid of it and remove the markers
          if (polygon) {
            polygon.setMap(null);
            hideMarkers(markers);
          }
          // Switching the drawing mode to the HAND (i.e., no longer drawing).
          drawingManager.setDrawingMode(null);
          // Creating a new editable polygon from the overlay.
          polygon = event.overlay;
          polygon.setEditable(true);
          // Searching within the polygon.
          searchWithinPolygon(polygon);
          // Make sure the search is re-done if the poly is changed.
          polygon.getPath().addListener('set_at', searchWithinPolygon);
          polygon.getPath().addListener('insert_at', searchWithinPolygon);
        });
		*/
      }

      function createMarker(location) {

        var position = location.location;
        //console.log('position')
        //console.log(position)
        for (var key in position) {
          this[key] = position[key];
        }
        //console.log(lat)
        //console.log(lng)

        var title = location.title;
        var placeId = location.placeId;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          icon: defaultIcon,
          //id: i,
          id: placeId, 
          lat:lat, 
          lng: lng
        });
        console.log(marker)
    
        location.marker.push(marker);
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
          getPlacesDetails(this, largeInfowindow)
          //populateInfoWindow(this, largeInfowindow);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        });
      }

      /*
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        }
      }
      */

      // This function will loop through the markers array and display them all.
      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        console.log('bounds')
        console.log(bounds)
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
        console.log(map.getZoom())
        if (map.getZoom() > 18) {
          map.setZoom(18);
        }
      }

      // This function will loop through the listings and hide them all.
      function hideMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }

      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
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

	  /*
      // This shows and hides (respectively) the drawing options.
      function toggleDrawing(drawingManager) {
        if (drawingManager.map) {
          drawingManager.setMap(null);
          // In case the user drew anything, get rid of the polygon
          if (polygon !== null) {
            polygon.setMap(null);
          }
        } else {
          drawingManager.setMap(map);
        }
      }
	  */

      // This function hides all markers outside the polygon,
      // and shows only the ones within it. This is so that the
      // user can specify an exact area of search.
      /*
	  function searchWithinPolygon() {
        for (var i = 0; i < markers.length; i++) {
          if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
            markers[i].setMap(map);
          } else {
            markers[i].setMap(null);
          }
        }
      }
	  */

      // This function takes the input value in the find nearby area text input
      // locates it, and then zooms into that area. This is so that the user can
      // show all listings, then decide to focus on one area of the map.
      /*
	  function zoomToArea() {
        // Initialize the geocoder.
        var geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        var address = document.getElementById('zoom-to-area-text').value;
        // Make sure the address isn't blank.
        if (address == '') {
          window.alert('You must enter an area, or address.');
        } else {
          // Geocode the address/area entered to get the center. Then, center the map
          // on it and zoom in
          geocoder.geocode(
            { address: address,
              componentRestrictions: {locality: 'Sao Paulo'}
            }, function(results, status) {
              console.log(results)
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
              } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
              }
            });
        }
      }
	  */

      // This function allows the user to input a desired travel time, in
      // minutes, and a travel mode, and a location - and only show the listings
      // that are within that travel time (via that travel mode) of the location
      /*
      function searchWithinTime() {
        // Initialize the distance matrix service.
        var distanceMatrixService = new google.maps.DistanceMatrixService;
        var address = document.getElementById('search-within-time-text').value;
        // Check to make sure the place entered isn't blank.
        if (address == '') {
          window.alert('You must enter an address.');
        } else {
          hideMarkers(markers);
          // Use the distance matrix service to calculate the duration of the
          // routes between all our markers, and the destination address entered
          // by the user. Then put all the origins into an origin matrix.
          var origins = [];
          for (var i = 0; i < markers.length; i++) {
            origins[i] = markers[i].position;
          }
          var destination = address;
          var mode = document.getElementById('mode').value;
          // Now that both the origins and destination are defined, get all the
          // info for the distances between them.
          distanceMatrixService.getDistanceMatrix({
            origins: origins,
            destinations: [destination],
            travelMode: google.maps.TravelMode[mode],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          }, function(response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
              window.alert('Error was: ' + status);
            } else {
              displayMarkersWithinTime(response);
            }
          });
        }
      }
      */

      // This function will go through each of the results, and,
      // if the distance is LESS than the value in the picker, show it on the map.
      /*
	  function displayMarkersWithinTime(response) {
        var maxDuration = document.getElementById('max-duration').value;
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        // Parse through the results, and get the distance and duration of each.
        // Because there might be  multiple origins and destinations we have a nested loop
        // Then, make sure at least 1 result was found.
        var atLeastOne = false;
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status === "OK") {
              // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch
              // the function to show markers within a user-entered DISTANCE, we would need the
              // value for distance, but for now we only need the text.
              var distanceText = element.distance.text;
              // Duration value is given in seconds so we make it MINUTES. We need both the value
              // and the text.
              var duration = element.duration.value / 60;
              var durationText = element.duration.text;
              if (duration <= maxDuration) {
                //the origin [i] should = the markers[i]
                markers[i].setMap(map);
                atLeastOne = true;
                // Create a mini infowindow to open immediately and contain the
                // distance and duration
                var infowindow = new google.maps.InfoWindow({
                  content: durationText + ' away, ' + distanceText +
                    '<div><input type=\"button\" value=\"View Route\" onclick =' +
                    '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
                });
                infowindow.open(map, markers[i]);
                // Put this in so that this small window closes if the user clicks
                // the marker, when the big infowindow opens
                markers[i].infowindow = infowindow;
                google.maps.event.addListener(markers[i], 'click', function() {
                  this.infowindow.close();
                });
              }
            }
          }
        }
        if (!atLeastOne) {
          window.alert('We could not find any locations within that distance!');
        }
      }
	  */
      /*
      // This function is in response to the user seelecting "show route" on one
      // of the markers within the desired commute. This will display the route
      // on the map.
      function displayDirections(origin) {
        hideMarkers(markers);
        var directionsService = new google.maps.DirectionsService;
        // Get the destination address from the user entered value.
        var destinationAddress =
            document.getElementById('search-within-time-text').value;
        // Get mode again from the user entered value.
        var mode = document.getElementById('mode').value;
        directionsService.route({
          // The origin is the passed in marker's position.
          origin: origin,
          // The destination is user entered address.
          destination: destinationAddress,
          travelMode: google.maps.TravelMode[mode]
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              draggable: true,
              polylineOptions: {
                strokeColor: 'green'
              }
            });
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      */
      // This function is in response to the user selecting "show route" on one
      // of the markers within the calculated distance. This will display the route
      // on the map.
      /*
	  function displayDirections(origin) {
        hideMarkers(markers);
        var directionsService = new google.maps.DirectionsService;
        // Get the destination address from the user entered value.
        var destinationAddress =
            document.getElementById('search-within-time-text').value;
        // Get mode again from the user entered value.
        var mode = document.getElementById('mode').value;
        directionsService.route({
          // The origin is the passed in marker's position.
          origin: origin,
          // The destination is user entered address.
          destination: destinationAddress,
          travelMode: google.maps.TravelMode[mode]
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              draggable: true,
              polylineOptions: {
                strokeColor: 'green'
              }
            });
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
	  */
      

      // This function fires when the user selects a searchbox picklist item.
      // It will do a nearby search using the selected query string or place.
      /*
	  function searchBoxPlaces(searchBox) {
        hideMarkers(placeMarkers);
        var places = searchBox.getPlaces();
        // For each place, get the icon, name and location.
        createMarkersForPlaces(places);
        if (places.length == 0) {
          window.alert('We did not find any places matching that search!');
        }
      }
	  */

      // This function firest when the user select "go" on the places search.
      // It will do a nearby search using the entered query string or place.
      /*
	  function textSearchPlaces() {
        var bounds = map.getBounds();
        hideMarkers(placeMarkers);
        var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
          query: document.getElementById('places-search').value,
          bounds: bounds
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarkersForPlaces(results);
          }
        });
      }
	  */

      // This function creates markers for each place found in either places search.
      function createMarkersForPlaces(places) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
            url: place.icon,
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
          });
          // Create a single infowindow to be used with the place details information
          // so that only one is open at once.
          var placeInfoWindow = new google.maps.InfoWindow();
          // If a marker is clicked, do a place details search on it in the next function.
          marker.addListener('click', function() {
            if (placeInfoWindow.marker == this) {
              console.log("This infowindow already is on this marker!");
            } else {
              getPlacesDetails(this, placeInfoWindow);
            }
          });
          placeMarkers.push(marker);
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        }
        map.fitBounds(bounds);
      }

    // This is the PLACE DETAILS search - it's the most detailed so it's only
    // executed when a marker is selected, indicating the user wants more
    // details about that place.
    function getPlacesDetails(marker, infowindow) {
      console.log('getPlacesDetails')
      markers.forEach(function(marker) {
        marker.setAnimation(null);
        marker.setIcon(defaultIcon)
      });
	  console.log(marker)
	  marker.setAnimation(google.maps.Animation.BOUNCE);
	  marker.setIcon(highlightedIcon);
      var service = new google.maps.places.PlacesService(map);
	  
	  		/*
			var x = marker.position;
			for (var key in x) {
				this[key] = x[key];
			}
		  console.log(lat)
		  console.log(lng)
		  
	  */
	  var latitude = marker.lat;
	  var longitude = marker.lng;
	  
	  console.log('latlng')
	  console.log(latitude)
    console.log(longitude)
    
    var yelpString = '';
    var yelpURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&radius=10&latitude=' + latitude + '&longitude=' + longitude
      console.log(yelpURL)
    /*
      $.ajax({
        type: 'GET',
        url: yelpURL,
        headers: {'Authorization': 'Bearer Gvs2ZYNvVHgAQ4fgR3iQ1KhCMxw5LCJ8LsfVG9HE4098aa28fyWa2jzRoxsG-wN3Yk-KEya5B_FUmI3_T5vin22re62JwpOMpDxViwHrFq3Yy32VEqIn1K1XGukjXXYx'}
    })
    .done(function (data) {
      */

    $.ajax({
      //url: "https://api.yelp.com/v3/businesses/search?term=food&location=45-09+34th+Ave+Long+Island+City+ny+11101&radius=50&price=1,2,3,4",
      url: yelpURL,
      headers: {
        //"Authorization": "Bearer my_token"
        "Authorization": "Bearer Gvs2ZYNvVHgAQ4fgR3iQ1KhCMxw5LCJ8LsfVG9HE4098aa28fyWa2jzRoxsG-wN3Yk-KEya5B_FUmI3_T5vin22re62JwpOMpDxViwHrFq3Yy32VEqIn1K1XGukjXXYx"
      },
      "cors": {
        "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
      },
      'cache': true,
      dataType: 'json',
      success: function(data) {
        console.log("Your request succeeded!");
        //debugger;


        //alert(data);
        console.log(data)
        console.log(data.businesses[0].categories)
        console.log(data.businesses[0].price)

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


        //PopulateData(data);

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
            //innerHTML += '<br><br><strong>Price:</strong><br>';
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
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
              infowindow.marker = null;
            });
          }
        });

      },
        error: function(data) {
          console.log("Your Request ended in an error");
          console.log(data);
          //debugger;
        }
      })
    
    /*
    }).
    error(function (data) {
        alert("error: " + JSON.stringify(data));
    })
    */




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
                    console.log('park')
                    //console.log(parkingPlaces.length)
                    //for (var i = 0; i < parkingPlaces.length; i++) {
                    //  console.log(parkingPlaces[i].name)
                      //parkingPlaces.push(response);
                      //console.log(response)
                    //}
                    innerHTML += foursquareString;
                    
                    //if (place.opening_hours) {
                    //  innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    //      place.opening_hours.weekday_text[0] + '<br>' +
                    //      place.opening_hours.weekday_text[1] + '<br>' +
                    //      place.opening_hours.weekday_text[2] + '<br>' +
                    //      place.opening_hours.weekday_text[3] + '<br>' +
                    //      place.opening_hours.weekday_text[4] + '<br>' +
                    //      place.opening_hours.weekday_text[5] + '<br>' +
                    //      place.opening_hours.weekday_text[6];
                    //}
                    
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
              //marker.setAnimation(null);
          




              //}
          }).fail(function(){
              alert("A API do Foursquare retornou com falha. Favor tentar novamente.");
          });
    



      }).fail(function(){
          alert("A API do Foursquare retornou com falha. Favor tentar novamente.");
      });
      */
      
      //var foursquareVenueURL = 'https://api.foursquare.com/v2/venues/' + venueId + 
      //'&client_id=W4YU1GJPKZDBD5IBLYY3TIIYWLTBJ2YG1XLJUDX4C2QZHKWO&client_secret=SP4ZJF00DNY4A21CHNEKCABX5XCKJCH41W2XVWKKYEF5EGUA&v=20160118'


         //var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + latitude + ',' + longitude +
	  //      '&client_id=W4YU1GJPKZDBD5IBLYY3TIIYWLTBJ2YG1XLJUDX4C2QZHKWO&client_secret=SP4ZJF00DNY4A21CHNEKCABX5XCKJCH41W2XVWKKYEF5EGUA&v=20160118&categoryId=4c38df4de52ce0d596b336e1&limit=5'
    /*
    console.log(foursquareVenueURL)
	  //categoryId=4c38df4de52ce0d596b336e1
    var parkingPlaces = [];
    var foursquareString ='';
	  	$.getJSON(foursquareVenueURL, function( data ) {
	        //for (var i = 0; i < data.response.venues.length; i++) {
          //  var response = data.response.venues[i];
          //  foursquareString += data.response.venues[i].name  + '<br>';
          //  parkingPlaces.push(response);
	        	console.log(data)
	        //}
	    }).fail(function(){
	        alert("Tivemos um problema, tente carregar novamente a página.");
      });
      */
	  /*
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
          innerHTML += '<br><br><strong>Hours:</strong><br>';
          console.log('park')
          //console.log(parkingPlaces.length)
          //for (var i = 0; i < parkingPlaces.length; i++) {
          //  console.log(parkingPlaces[i].name)
            //parkingPlaces.push(response);
	        	//console.log(response)
          //}
          innerHTML += foursquareString;
          
          if (place.opening_hours) {
            innerHTML += '<br><br><strong>Hours:</strong><br>' +
                place.opening_hours.weekday_text[0] + '<br>' +
                place.opening_hours.weekday_text[1] + '<br>' +
                place.opening_hours.weekday_text[2] + '<br>' +
                place.opening_hours.weekday_text[3] + '<br>' +
                place.opening_hours.weekday_text[4] + '<br>' +
                place.opening_hours.weekday_text[5] + '<br>' +
                place.opening_hours.weekday_text[6];
          }
          
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
      */
	  //marker.setAnimation(null);
    }

var ViewModel = function() {
  var self = this;

  this.favoritePlacesList = ko.observableArray([]);
  //this.choices = [];
  model.locations.forEach(function(location) {
    self.favoritePlacesList.push( new FavoritePlace(location));
    //self.choices.push( new Category(location.category))
  })


  this.choices = ['all', 'bakery', 'brazilian', 'burgers', 'japanese', 'korean', 'pizza'];
  this.selectedChoice = ko.observable("all");

  this.selectedChoice.subscribe(function(newValue) {
      //alert("the new value is " + newValue); 
      console.log(self.favoritePlacesList)
      //self.favoritePlacesList=[];
      model.locations.forEach(function(location) {
        self.favoritePlacesList.pop();
      })

      hideMarkers(markers);
      //largeInfowindow.marker = null;
      largeInfowindow.close();
      markers=[];
      model.locations.forEach(function(location) {
        //self.favoritePlacesList.push( new FavoritePlace(location));

        console.log(newValue)
        if (location.category === newValue || newValue == 'all') {
          self.favoritePlacesList.push( new FavoritePlace(location));
          //location.marker.push(marker);
          // Push the marker to our array of markers.
          createMarker(location)
          //markers.push(location.marker);

        //} else {
        //  if (newValue == 'all') {
        //    self.favoritePlacesList.push( new FavoritePlace(location));
        //    createMarker(location)
        //  }
        }
      })
      showListings();
      
  
  });

  this.chosenSelection = ko.observable();


  this.selectionChanged = function(clickedSelection) {
    console.log('selection')
    console.log(clickedSelection)
  }

  this.locationClick = function(clickedLocation) {
    console.log('click')
	console.log(this)
	//for (var i = 0; i < model.locations.length; i++) {
	//	model.locations[i].marker()[0].setIcon(defaultIcon);
	//};
	//hideMarkers(markers);
	//showListings(markers);
    //clickedLocation.marker()[0].setIcon(highlightedIcon);
    clickedLocation.current(true);
    getPlacesDetails(clickedLocation.marker()[0], largeInfowindow)

	//getPlacesDetails(this, largeInfowindow)
    //self.currentCat(clickedCat);
  }
	/*
    this.selecionarLugar = function(lugar){
		console.log('selecionarLugar')
    	// Deixa todos marcadores com aparencia padrão
        for (let i = 0; i < self.lugarLista().length; i++) {
           self.lugarLista()[i].marcador()[0].setIcon(pinMarkPadrao);
           self.lugarLista()[i].destacado(false);
        }
        // Destaca o marcador selecionado
        lugar.marcador()[0].setIcon(pinMarkSelecionado);
        lugar.destacado(true);
        populateInfoWindow(lugar.marcador()[0], largeInfowindow)
     
    }
	*/

}

ko.applyBindings(new ViewModel());

