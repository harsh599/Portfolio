(function ($) {
    "use strict";
    // Preloader
    $(window).on('load', function () {
        anime.timeline({
                targets: '.preloader',
                easing: 'easeOutExpo',
            })
            .add({
                height: ['100vh', '0vh'],
                duration: 700,
                delay: 2000,
            })
            .add({
                offset: '-=400',
                complete: function (anim) {
                    document.querySelector('.preloader').remove();
                }
            })
            .add({
                offset: '-=1300',
                targets: 'body',
                top: 0,
                duration: 700,
            })

        anime.timeline({
                easing: 'easeOutExpo',
            })
            .add({
                targets: '.preloader .txt',
                delay: 100,
                opacity: 1,
                duration: 700,
                translateY: ["30px", "0px"],
            })
            .add({
                targets: '.preloader .progress',
                offset: '-=400',
                opacity: 1,
                duration: 700,
            })
            .add({
                targets: ".preloader .progress .bar-loading",
                offset: '-=400',
                duration: 2000,
                width: ["0", "100%"],
            })
            .add({
                targets: '.preloader .loading',
                offset: '-=900',
                opacity: 0,
                duration: 1000,
                translateY: ["0", "-100px"],
            })
    });
    // Mobile Menu
    function clone_main_menu() {
        var _clone_menu = $('#header .clone-main-menu');
        var _target = $('#box-mobile-menu .clone-main-menu');
        var _data_width = $('#header .main-navigation').data('width');
        if ($(window).innerWidth() <= _data_width) {
            if (_clone_menu.length > 0) {
                _clone_menu.each(function () {
                    $(this).appendTo('#box-mobile-menu .box-inner');
                });
            }
        } else {
            if (_target.length > 0) {
                _target.each(function () {
                    $(this).appendTo('#header .main-navigation');
                });
            }
        }

        function action_addClass() {
            $('body').addClass('box-mobile-menu-open');
            return false;
        }

        function action_removeClass() {
            $('body').removeClass('box-mobile-menu-open');
            return false;
        }
        $(".mobile-navigation").on('click', action_addClass);
        $("#box-mobile-menu .close-menu, .body-overlay").on('click', action_removeClass);
    }
    function box_mobile_menu() {
        var _content = $('#box-mobile-menu .clone-main-menu');
        if ($(window).innerWidth() <= 1024) {
            _content.each(function () {
                var t = $(this);
                t.addClass('active');
                $(this).find('.toggle-submenu').on('click', function () {
                    t.removeClass('active');
                    var text_next = $(this).prev().text();
                    $('#box-mobile-menu .box-title').html(text_next);
                    t.find('li').removeClass('mobile-active');
                    $(this).parent().addClass('mobile-active');
                    $(this).parent().closest('.submenu').css({
                        'position': 'static',
                        'height': '0',
                    });
                    $('#box-mobile-menu #back-menu').css('display', 'block');
                })
            });
            $('#box-mobile-menu #back-menu').on('click', function () {
                _content.find('li.mobile-active').each(function () {
                    _content.find('li').removeClass('mobile-active');
                    if ($(this).parent().hasClass('main-menu')) {
                        _content.addClass('active');
                        $('#box-mobile-menu .box-title').html('MAIN MENU');
                        $('#box-mobile-menu #back-menu').css('display', 'none');
                    } else {
                        _content.removeClass('active');
                        $(this).parent().parent().addClass('mobile-active');
                        $(this).parent().css({
                            'position': 'absolute',
                            'height': 'auto',
                        });
                        var text_prev = $(this).parent().parent().children('a').text();
                        $('#box-mobile-menu .box-title').html(text_prev);
                    }
                })
            });
        }
        $('.mobile-navigation').on('click', function () {
            $('body').addClass('box-mobile-menu-open');
        });
        $('#box-mobile-menu .close-menu, .body-overlay').on('click', function () {
            $('body').removeClass('box-mobile-menu-open');
        });
    }
    $(window).on("resize", function () {
        clone_main_menu();
    });
    $(document).ready(function () {
        clone_main_menu();
        box_mobile_menu();
    });
    $(window).on("load", function () {
        clone_main_menu();
        box_mobile_menu();
    });
    var wind = $(window);
    // Scroll
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70 // offste (in px) for fixed top navigation
    });
    // Navbar scrolling background
    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        } else {
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        }
    });
    // Close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    // Progress Bar
    $(window).on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });
    // Sections Background Image With Data 
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    // Clients Carousel
    $('#rudy-client-carousel').imagesLoaded(function () {
        $('#rudy-client-carousel').owlCarousel({
            loop: true
            , margin: 10
            , autoplay: true
            , smartSpeed: 1000
            , nav: false
            , dots: false
            , responsive: true
            , responsive: {
                0: {
                    items: 2
                }
                , 480: {
                    items: 2
                , }
                , 768: {
                    items: 5
                , }
            }
        });
    });
    // Blog owlCarousel
    $('.rudy-blog .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 2
            }
        }
    });
    // Testimonial owlCarousel
    $('.rudy-testimonial .owl-carousel').owlCarousel({
        loop: true
        , margin: 0
        , mouseDrag: true
        , dots: true
        , autoplay: false
        , responsiveClass:true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 1
            }
        }
    });
    // Initialize smoothscroll plugin
    smoothScroll.init({
        offset: 60
    });
    // Button
    var buttons = document.querySelectorAll(".rudy-btn .rudy-btn2");
    for(var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.addEventListener("click", function() {
        if(!button.classList.contains("active"))
          button.classList.add("active");
        else
          button.classList.remove("active");
      });
    }
})(jQuery);