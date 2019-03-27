$(function () {

    $('.dropdown-trigger').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).siblings('.dropdown-content').toggleClass('dropdown-content--visible');
        $(this).toggleClass('active').parent().siblings('.dropdown-content').toggleClass('dropdown-content--visible');
    });
    //
    // $('.header__popups .popup-overlay').add('.popup__close').click(function (e) {
    //     $('.header__popups').removeClass('active');
    //     $('.dropdown-trigger').removeClass('active');
    //     $('.dropdown-pop').removeClass('dropdown-pop--show');
    // });
    // $('.header-mood .dropdown-trigger').click(function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $('.header__popups').toggleClass('active').find('.mood-drop').addClass('dropdown-pop--show');
    // });
    // $('.header__search .dropdown-trigger').click(function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $('.header__popups').toggleClass('active').find('.search-drop').addClass('dropdown-pop--show');
    // });
    // $('.header__settings .dropdown-trigger').click(function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $('.header__popups').toggleClass('active').find('.filter-drop').addClass('dropdown-pop--show');
    // });
    // $('.header__messages .dropdown-trigger').click(function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $('.header__popups').toggleClass('active').find('.messages-drop').addClass('dropdown-pop--show');
    // });


    $(document).on('click', '.sidemenu__back', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('menu-opened');
    });

    $(document).on("click", ".avail-toggle", function (e) {
        e.preventDefault();
        var collapseTarget = $(this).attr("href");
        $(collapseTarget).slideToggle();
        $(this).toggleClass("collapsed");
    });


    function newCustomScroll(scrollElement) {
        var gripper = scrollElement.find('.scrollable__area-gripper');
        var scrollableFlow = scrollElement.find('.scrollable__flow');
        var scrollableWrap = scrollElement.find('.scrollable__wrap');
        initGripper();

        scrollableWrap.scroll(function () {
            gripper.css('top', scrollableWrap.scrollTop() * scrollElement.height() / scrollableFlow.height());
        });

        function initGripper() {
            gripper.css('height', scrollElement.height() * scrollElement.height() / scrollableFlow.height());
            gripper.css('top', scrollableWrap.scrollTop() * scrollElement.height() / scrollableFlow.height())
        }

        scrollElement.mouseover(function () {
            initGripper();
            gripper.css('opacity', 1);
        });
        scrollElement.mouseleave(function () {
            gripper.css('opacity', '');
        })

    }

    $('.scrollable__area').css('margin-right', '-' + getScrollBarWidth() + 'px');

    getScrollBarWidth();
    newCustomScroll($('.messages__scroll'));
    newCustomScroll($('.messages__sidebar-scroll'));
    newCustomScroll($('.profile-chat__scroll'));
    newCustomScroll($('.edit-profile__body'));

    function getScrollBarWidth() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2)
            w2 = outer.clientWidth;
        document.body.removeChild(outer);
        return (w1 - w2);
    }

    $('.edit-profile__header')
            .addClass('sticky-element-original')
            .clone()
            .insertAfter('.edit-profile__header')
            .addClass('sticky-element-active')
            .css('position', 'fixed')
            .css('top', '0')
            .css('margin-top', '0')
            .css('z-index', '500')
            .removeClass('sticky-element-original')
            .hide();

    if ($('.edit-profile__header').length) { // if element exist
        scrollIntervalID = setInterval(stickIt, 10);
        // https://medium.com/@dhg/82ced812e61c#ee02
        // https://codepen.io/senff/pen/ayGvD
        // TODO: пояснити для чого сетінтервал і пояснити як працює скрипт)
    }

    function stickIt() {

        var orgElementPos = $('.sticky-element-original').offset();
        orgElementTop = orgElementPos.top;
        var end = $('.edit-profile__end').offset().top;

        if ($(window).scrollTop() >= (orgElementTop) && $(window).scrollTop() <= (end - 50)) {
            orgElement = $('.sticky-element-original');
            coordsOrgElement = orgElement.offset();
            leftOrgElement = coordsOrgElement.left;
            widthOrgElement = orgElement.css('width');
            $('.sticky-element-active').css('left', leftOrgElement + 'px').css('top', 0).css('width', widthOrgElement).show();
            $('.sticky-element-original').css('visibility', 'hidden');
        } else {
            $('.sticky-element-active').hide();
            $('.sticky-element-original').css('visibility', 'visible');
        }
    }

    $(document).on("click", ".settings__sidebar-trigger", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.settings__sidebar-title').toggleClass('active');
        $('.settings__mobile-overlap').toggleClass('overlap-active');
        $('.settings__sidebar').toggleClass('sidebar-open');
    });

    $(document).on("click", ".messages__sidebar-trigger", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.messages__sidebar-header').add('.messages__sidebar').toggleClass('active');
    });


    // $(document).on("click", ".book-continue", function(e){
    //     $(".book-slider").toggleClass("expand");
    // });
    // $(document).on("click", ".book-continue-2", function(e){
    //     $(".book-slider").toggleClass("last");
    // });
    // $(document).on("click", ".book-back", function(e){
    //     $(".book-slider").toggleClass("expand");
    // });
    $(document).on("click", ".book-back-2", function (e) {
        $(".book-slider").toggleClass("last");
    });

    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    })

    $(document).on("focus", ".creditCardText", function () {
        $('.creditCardText').keyup(function () {
            var foo = $(this).val().split(" ").join(""); // remove hyphens
            if (foo.length > 0) {
                foo = foo.match(new RegExp('.{1,4}', 'g')).join(" ");
            }
            $(this).val(foo);
        });
    })


});
