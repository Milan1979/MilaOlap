var Carousel = (function() {
	var authToken = "0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18";
	var apiUrl = "https://photorankapi-a.akamaihd.net/customers/215757/media/recent?auth_token=" + authToken + "&version=v2.2";

	var imagePlaceholders = [ $("#image1 a"), $("#image2 a"), $("#image3 a"), $("#image4 a"), $("#image5 a"), $("#image6 a")];
	var images = [];
	var firstImageIndex = 0;
	
	var initButtons = function() {
		$("#go-left").on("click", function(event) {
			event.preventDefault();
			
			if (firstImageIndex > 0) {
				stepImages(-1);
			}
		});

		$("#go-right").on("click", function(event) {
			event.preventDefault();
			
			if (firstImageIndex < images.length - imagePlaceholders.length) {
				stepImages(1);
			}
		});
	};

	var initCarousel = function() {
		$.get(apiUrl, function(response) {
			
			for (var index in response.data._embedded.media) {
				var image = response.data._embedded.media[index].images;
				images.push( { thumbnail: image.thumbnail, normal: image.normal });
			}
			
			setImages(0);
		});
	};
	
	var stepImages = function(step) {
		var shift = firstImageIndex + step;
		
		setImages(shift);
		
		firstImageIndex = shift;
	};
	
	var setImages = function(shift) {
		for (var counter = 0; counter < imagePlaceholders.length; counter++) {
			imagePlaceholders[counter].attr("href", images[counter + shift].normal);
			imagePlaceholders[counter].children("img").attr("src", images[counter + shift].thumbnail);
		}
	};
	
	var init = function() {
		initButtons();
		initCarousel();
	};
	
	return {
		init: init
	};

})();

Carousel.init();