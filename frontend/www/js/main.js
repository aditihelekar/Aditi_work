(function() {
	'use strict';
	var app = {
		latitude:0.0,
		longitude:0.0,
		sign:"sign",
		distance:0.0
	};

	document.getElementById('sendButton').onclick = function() {
	    // Add all the values to app variables
	    var select = document.getElementById('selectSignToAdd');
	    var selected = select.options[select.selectedIndex];
	    var key = selected.value;
	    var label = selected.textContent;
	    app.sign = label;
	    var latitudeText = document.getElementById('latitude');
	    app.latitude = latitudeText.value;
	    var longitudeText = document.getElementById('longitude');
	    app.longitude = longitudeText.value;
	    console.log("On Send button pressed");
	    if (app.latitude == "" || app.longitude == "" || select.selectedIndex == 0) {
	    	console.log("In first if for null");
	    	if (document.getElementById('latitude').value == "") {
	    		alert( "Please provide correct Latitude" );
	            document.getElementById('latitude').focus() ;
	    	}
	    	if (document.getElementById('longitude').value == "") {
	    		alert( "Please provide correct Longitude" );
	            document.getElementById('longitude').focus() ;
	    	}
	    	if (select.selectedIndex == 0) {
	    		alert( "Please provide correct Sign" );
	            document.getElementById('selectSignToAdd').focus() ;
	    	}
	    }
	    else{
	    	console.log("Some input values are not appropriate");
	    	if(!app.isNumberLatLon(app.latitude) || !app.isNumberLatLon(app.latitude)){
	    		console.log("!app.isNumber(app.latitude) || !app.isNumber(app.latitude)");
	    		if (!app.isNumberLatLon(app.latitude)) {
		    		alert( "Please provide correct Latitude" );
		            document.getElementById('latitude').focus() ;
	    		}
		    	if (!app.isNumberLatLon(app.longitude)) {
		    		alert( "Please provide correct Longitude" );
		            document.getElementById('longitude').focus() ;
		    	}
	    	}
	    	else {
	    		console.log("In else");
	    		app.feedTrafficSignData();
	    		document.getElementById('latitude').value = "";
	    		document.getElementById('longitude').value = "";
	    		document.getElementById('selectSignToAdd').value = 0
	    	}
	    }
  	};

	app.feedTrafficSignData = function() {
		var url = 'https://sheltered-thicket-48750.herokuapp.com/feedTrafficSign?latitude='+ app.latitude + '&longitude=' + app.longitude + '&sign=' + app.sign;
		// TODO add cache logic here

		// Fetch the latest data.
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
		  if (request.readyState == XMLHttpRequest.DONE) {
		    if (request.status == 200) {
		      var response = JSON.parse(request.response);
		      var results = response.query.results;
		      console.log(response);
		    }
		  } else {
		    // Return the initial weather forecast since no data is available.
		    console.log('Connection not successful in main.js');
		  }
		};
		request.open('POST', url);
		request.send();
	};

 
	app.isNumberLatLon  = function(n){
		if (!isNaN(parseFloat(n)) && isFinite(n)) {
			if (n >= -90.000 && n <= 90.00) {
				return true
			}
		}
		return false;
	};

	app.isNumber  = function(n){
			
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	document.getElementById('getButton').onclick = function() {
	    // Add all the values to app variables
	    var latitudeText = document.getElementById('latitudeGet');
	    app.latitude = latitudeText.value;
	    var longitudeText = document.getElementById('longitudeGet');
	    app.longitude = longitudeText.value;
	    var distanceText = document.getElementById('distanceGet');
	    app.distance = distanceText.value;
	    console.log("On Get button pressed");
	    if (app.latitude == "" || app.longitude == "" || app.distance == "") {
	    	if (document.getElementById('latitudeGet').value == "") {
	    		alert( "Please provide correct Latitude" );
	            document.getElementById('latitudeGet').focus() ;
	    	}
	    	if (document.getElementById('longitudeGet').value == "") {
	    		alert( "Please provide correct Longitude" );
	            document.getElementById('longitudeGet').focus() ;
	    	}
	    	if (document.getElementById('distanceGet').value == "") {
	    		alert( "Please provide correct Distance" );
	            document.getElementById('distanceGet').focus() ;
	    	}
	    }
	    else{
	    	console.log("Some input values are not appropriate");
	    	if(!app.isNumberLatLon(app.latitude) || !app.isNumberLatLon(app.latitude) || !app.isNumber(app.distance)){
	    		console.log("!app.isNumber(app.latitude) || !app.isNumber(app.latitude)");
	    		if (!app.isNumberLatLon(app.latitude)) {
		    		alert( "Please provide correct Latitude" );
		            document.getElementById('latitudeGet').focus() ;
	    		}
		    	if (!app.isNumberLatLon(app.longitude)) {
		    		alert( "Please provide correct Longitude" );
		            document.getElementById('longitudeGet').focus() ;
		    	}
		    	if (!app.isNumber(app.distance)) {
		    		alert( "Please provide correct Distance" );
	            	document.getElementById('distanceGet').focus() ;
		    	}
	    	}
	    	else {
	    		console.log("In else");
	    		app.getTrafficSign();
	    		document.getElementById('latitudeGet').value = "";
	    		document.getElementById('longitudeGet').value = "";
	    		document.getElementById('distanceGet').value = "";
	    	}
	    }
  	};


	app.getTrafficSignData = function() {
	    var url = 'http://localhost:8000/getTrafficSign?latitude=' + app.latitude + '&longitude=' + app.longitude + '&distance=' + app.distance;
	    // TODO add cache logic here
	    
	    // Fetch the latest data.
	    var request = new XMLHttpRequest();
	    request.onreadystatechange = function() {
	      if (request.readyState == XMLHttpRequest.DONE) {
	        if (request.status == 200) {
	          var response = JSON.parse(request.response);
	          var results = response.query.results;
	          console.log(response);
	        }
	      } else {
	        // Return the initial weather forecast since no data is available.
	        console.log('Connection not successful in main.js');
	      }
	    };
	    request.open('GET', url);
	    request.send();
  	};
  	
})();