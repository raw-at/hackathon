(function ($) {
  $(document).ready(function(){

	// hide .navbar first

  	$(".navbar-inverse").fadeOut();

	// fade in .navbar
	$(function () {
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 300) {
				$('.navbar-inverse').fadeIn();
			} else {
				$('.navbar-inverse').fadeOut();
			}
		});

	});

});

  }(jQuery));

var wrapper = document.getElementById('wrapper');
window.addEventListener('load',function(){
  wrapper.style.display = 'none';
});
