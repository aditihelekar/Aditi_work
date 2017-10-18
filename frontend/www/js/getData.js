(function() {
	'use strict';
	var app = {
		latitude:0.0,
		longitude:0.0,
		sign:"sign",
		distance:0.0,
		distanceFrom:0.0
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
	    		app.getTrafficSignData();
	    		document.getElementById('latitudeGet').value = "";
	    		document.getElementById('longitudeGet').value = "";
	    		document.getElementById('distanceGet').value = "";
	    	}
	    }
  	};


	app.getTrafficSignData = function() {
	    var url = 'https://sheltered-thicket-48750.herokuapp.com/getTrafficSign?latitude=' + app.latitude + '&longitude=' + app.longitude + '&distance=' + app.distance;
	    // TODO add cache logic here
	    
	    // Fetch the latest data.
	    var request = new XMLHttpRequest();
	    request.onreadystatechange = function() {
	      if (request.readyState == XMLHttpRequest.DONE) {
	        if (request.status == 200) {
				var response = JSON.parse(request.response);
				console.log(response);
				if(response != ""){
					app.sign = response[0].trafficSign;
					app.distanceFrom = parseFloat(response[0].distance).toFixed(2);
					document.getElementById('trafficSignDisplay').innerHTML = "There is a \"" + app.sign + "\" at a distance of " + app.distanceFrom + " miles.";
					console.log(app.sign, app.distanceFrom);
					var img = document.createElement("IMG");
					img.width = 200;
    				img.height = 200;
    				img.style.cssFloat = "center";
					if (app.sign == "No U Turn") {
						img.src = "http://thumbs4.ebaystatic.com/d/l225/m/mYRxAGmvMSzGPKP70PYFQCw.jpg";
					}
					if (app.sign == "Stop Sign") {
						img.src = "http://cdn2.bigcommerce.com/n-pktq5q/c7chaa/products/949/images/1957/R1-1-2__99569.1456779619.380.500.png?c=2";
					}
					if (app.sign == "Speed Limit 55") {
						img.src = "https://images-na.ssl-images-amazon.com/images/I/41hHsm6ZbFL.jpg";
					}
					if (app.sign == "One Way") {
						img.src = "https://images.roadtrafficsigns.com/img/art/Design-Evolution-Oneway-Sign-2000-1.jpg";
					}
					if (app.sign == "Speed Limit 25") {
						img.src = "https://images.roadtrafficsigns.com/img/lg/K/Aluminum-Speed-Limit-Sign-K-2087.gif";
					}
					if (app.sign == "Yield") {
						img.src = "https://images-na.ssl-images-amazon.com/images/I/616s2O91OgL._SX355_.jpg";
					}
					if (app.sign == "Do not Enter") {
						img.src = "http://www.barcoproducts.com/media/catalog/product/cache/17/image/630x/040ec09b1e35df139433887a97daa66f/d/o/do_not_enter_sign-1283-1_1.jpg";
					}
					if (app.sign == "School Ahead") {
						img.src = "http://etc.usf.edu/clipart/68200/68257/68257_642_s1-1_c_md.gif";
					}
					if (app.sign == "No Straight Through") {
						img.src = "http://www.stopsignsandmore.com/images/Product/medium/2083.gif";
					}
					if (app.sign == "No Right Turn") {
						img.src = "https://stop-painting.com/images/r3-1sra16_l.jpg";
					}
					if (app.sign == "No Left Turn") {
						img.src = "http://www.safetysign.com/images/source/large-images/Y2731.png";
					}
					if (app.sign == "Straight Ahead Only") {
						img.src = "https://www.signsdirect.com/core/media/media.nl?id=25152&c=363017&h=bd2e0c92911dcf6d5766";
					}
					if (app.sign == "Do not Pass") {
						img.src = "https://www.usa-traffic-signs.com/v/vspfiles/photos/r4-1_1824-2.gif";
					}
					if (app.sign == "Keep Right") {
						img.src = "https://images.roadtrafficsigns.com/img/lg/X/keep-right-arrow-sign-x-r4-7a.png";
					}
					if (app.sign == "Wrong Way") {
						img.src = "http://www.safetysign.com/images/source/large-images/X4552.png";
					}
					if (app.sign == "No Parking") {
						img.src = "https://images.myparkingsign.com/img/lg/K/aluminum-no-parking-sign-k-1697.png";
					}
					document.getElementById('signImg').appendChild(img);
				}
				else{
					document.getElementById('trafficSignDisplay').innerHTML = "There is no sign data in vicinity of this location.";
					console.log(app.sign, app.distanceFrom);
				}
	        }
	    } 
	      else {
	        // Return the initial weather forecast since no data is available.
	        console.log('Connection not successful in main.js');
	      }
	    };
	    request.open('GET', url);
	    request.send();
  	};
  	
})();