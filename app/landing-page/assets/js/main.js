$(document).ready(function(){

	$('.dropdown-trigger').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).siblings('.dropdown-content').toggleClass('dropdown-content--visible');
        $(this).toggleClass('active').parent().siblings('.dropdown-content').toggleClass('dropdown-content--visible');
    });

});