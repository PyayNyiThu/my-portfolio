$(window).scroll(function (event) {
	$('nav').toggleClass('scrolled',$(this).scrollTop()>50);
})