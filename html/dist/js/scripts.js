"use strict";

var $ = jQuery.noConflict();
// Global functions
var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
function openPopupOverlay() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
  if ($('.bm-popup-overlay').length) return;
  $('body').append('<div class="bm-popup-overlay"></div>');
  $('body').addClass('is-lock').css('paddingRight', scrollbarWidth);
  $('.bm-popup-overlay').fadeIn(speed);
}
function closePopupOverlay() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
  $('.bm-popup-overlay').fadeOut(speed);
  setTimeout(function () {
    $('.bm-popup-overlay').remove();
  }, speed);
  $('body').removeClass('is-lock').css('padding-right', '');
}
function getRootVars() {
  var root = document.querySelector(":root");
  root.style.setProperty("--vh", window.innerHeight / 100 + "px");
  root.style.setProperty("--mh", $('header.bm-header').outerHeight() + "px");
  root.style.setProperty("--gi", ($('#isa-gifts').length > 0 ? $('#isa-gifts').outerHeight() : 0) + "px");
}
window.addEventListener('load', function () {
  var locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1,
      duration: 1.8,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      normalizeWheel: true,
      easing: function easing(t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      }
    }
  });
  var homeClass = $('.page-template-home').length;

  // if (homeClass > 0) {
  //     setTimeout(function(){
  //         window.scrollTo(0, 0);

  //     }, 10);
  // }
});

// Main functions
(function ($) {
  $.rt_noti = function (html) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2500;
    if ($('.bm-noti').length) return;
    $('body').append('<div class="bm-noti">' + html + '</div>');
    setTimeout(function () {
      $('.bm-noti').addClass('opening');
    }, 10);
    setTimeout(function () {
      $('.bm-noti').removeClass('opening');
    }, time);
    setTimeout(function () {
      $('.bm-noti').remove();
    }, time + 400);
  };
  function handleWordpressAdminMode() {
    if ($('#wpadminbar').length && $('.js-bm-navbar').length && $(window).width() <= 600) {
      $(window).on('scroll', function () {
        var top = $(window).scrollTop(),
          offsetTop = 46 - top > 0 ? 46 - top : 0;
        $('.js-bm-navbar').css('margin-top', offsetTop);
      });
    }
  }
  function initLazyLoad() {
    $('.lazy').Lazy({
      afterLoad: function afterLoad(el) {
        $(el).addClass('loaded');
        // handleIE();
      }
    });
  }
  function initSelect2() {
    if ($('.ginput_container select').length > 0) {
      $('.ginput_container select').select2({
        width: "100%",
        minimumResultsForSearch: -1
      });
    }
    if ($('.bm-form-group select').length > 0) {
      $('.bm-form-group select').select2({
        width: "100%",
        minimumResultsForSearch: -1
      });
    }
    if ($('select.bm-is-select2').length > 0) {
      $('select.bm-is-select2').select2({
        width: "100%",
        minimumResultsForSearch: -1
      });
    }
    if ($('select.bm-is-select2-filter').length > 0) {
      $('select.bm-is-select2-filter').select2({
        width: "100%",
        minimumResultsForSearch: -1,
        theme: "filter"
      });
    }

    // if( $('.pennacademy-course-ordering select').length > 0 ) {
    //     $('.pennacademy-course-ordering select').select2({
    //         width: "resolve",
    //         minimumResultsForSearch: -1
    //     });
    // }

    /* if( $('.wpforms-field select').length > 0 ) {
        $('.wpforms-field select').select2({
            width: "100%",
            minimumResultsForSearch: -1
        });
    } */
  }
  function initPopup() {
    $('[data-popup-target]').on('click', function (e) {
      e.preventDefault();
      var popupTarget = $(this).data('popup-target'),
        popupContent = $('[data-popup-content="' + popupTarget + '"]');
      if (popupContent.length == 0) return;
      popupContent.addClass('is-active');
      openPopupOverlay();
    });
    $('[data-popup-close]').on('click', function (e) {
      e.preventDefault();
      $(this).closest('[data-popup-content]').removeClass('is-active');
      closePopupOverlay();
    });
    $(document).on('click', '.bm-popup-overlay', function (e) {
      $('[data-popup-content]').removeClass('is-active');
      closePopupOverlay();
    });
  }
  function handleIE() {
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
      $('.bm-img-drop').each(function () {
        var $container = $(this),
          imgLazy = $(this).find('img').attr('src'),
          picLazy = $(this).find('source').attr('srcset'),
          imgUrl = picLazy ? picLazy : imgLazy;
        if (imgUrl) {
          $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('custom-object-fit');
        }
      });
    }
  }
  function initAnchorScroll() {
    $('a.js-anchor-scroll[href*=\\#]:not([href=\\#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
    $('body .bm-header a[href*=\\#]:not([href=\\#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('.bm-navbar-toggler').removeClass('is-active');
          $('.bm-navbar-collapse').removeClass('is-show');
          $('body').removeClass('is-lock');
          $('html, body').animate({
            scrollTop: target.offset().top - $('header .bm-navbar').outerHeight()
          }, 1000);
          return false;
        }
      }
    });
  }
  function initFormFloatLabel() {
    // Check input autofill
    $(window).bind('load', function () {
      $.each($('.bm-form-group input:-webkit-autofill'), function () {
        var label = $(this).prev();
        label.addClass('freeze');
      });
      $.each($('.gfield input:-webkit-autofill'), function () {
        var label = $(this).closest('.gfield').find('.gfield_label');
        label.addClass('freeze');
      });
      $.each($('.wpforms-field input:-webkit-autofill'), function () {
        var label = $(this).closest('.gfield').find('.gfield_label');
        label.addClass('freeze');
      });
    });

    // Check select
    $('.ginput_container_select select').closest('.gfield').addClass('has-select');
    $('.bm-form-group select').closest('.bm-form-group').addClass('has-select');

    // Check input
    var formFields = $('.gfield, .bm-form-group, .wpforms-field, .comment-form p');
    formFields.each(function () {
      var field = $(this),
        input = field.find('input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), textarea'),
        label = field.find('label');
      if (input.attr('type') != 'file') {
        input.focus(function () {
          label.addClass('freeze');
        });
      }
      input.focusout(function () {
        checkInput();
      });
      if (input.val() && input.val().length) {
        label.addClass('freeze');
      }
      function checkInput() {
        var valueLength = input.val().length;
        if (valueLength > 0) {
          label.addClass('freeze');
        } else {
          label.removeClass('freeze');
        }
      }
      input.change(function () {
        checkInput();
      });
    });
  }
  function handleLightGallery() {
    // Gallery
    $(document).on('click', '.bm-light-gallery', function (e) {
      e.preventDefault();
      var $dynamicGallery = document.querySelector(".bm-light-gallery");
      var sources = $(this).attr('data-sources');
      sources = JSON.parse(sources);
      var dynamicGallery = window.lightGallery($dynamicGallery, {
        dynamic: true,
        plugins: [lgVideo, lgThumbnail],
        // plugins: [lgVideo, lgAutoplay, lgZoom],
        dynamicEl: sources,
        download: false,
        counter: false,
        slideShowAutoplay: sources.length > 1 ? true : false,
        autoplayControls: false,
        autoplayVideoOnSlide: true,
        showCloseIcon: true,
        mobileSettings: {
          controls: true,
          showCloseIcon: true
        }
      });
      dynamicGallery.openGallery(0);
    });

    // Item
    $(document).on('click', '.bm-light-gallery-item', function (e) {
      e.preventDefault();
      var index = 0;
      var i = 0;
      var $dynamicGallery = document.querySelector(".bm-light-gallery-item");
      var sources = [];
      var element = $(this).closest('.bm-light-gallery-list');
      var urlTemp = $(this).find('img').attr('src');
      if (element.find('img').length > 0) {
        element.find('img').each(function (e) {
          if ($(this).attr('src') == urlTemp) {
            index = i;
          }
          var source = {
            "src": $(this).attr('src'),
            "thumb": $(this).attr('src'),
            "subHtml": $(this).attr('alt')
          };
          sources.push(source);
          i++;
        });
      }

      //sources = JSON.parse(sources);

      var dynamicGallery = window.lightGallery($dynamicGallery, {
        dynamic: true,
        // plugins: [lgZoom, lgVideo, lgThumbnail],
        plugins: [lgVideo, lgAutoplay],
        dynamicEl: sources,
        download: false,
        counter: false,
        slideShowAutoplay: sources.length > 1 ? true : false,
        autoplayControls: false,
        autoplayVideoOnSlide: true,
        showCloseIcon: true,
        mobileSettings: {
          controls: true,
          showCloseIcon: true
        }
      });
      dynamicGallery.openGallery(index);
    });
  }
  $(function () {
    getRootVars();
    initLazyLoad();
    initSelect2();
    initPopup();
    handleWordpressAdminMode();
    initFormFloatLabel();
    initAnchorScroll();
    handleLightGallery();
  });
  $(window).on('resize', function () {
    getRootVars();
  });
})(jQuery);
(function ($) {
  function initializeCustomSelect(selectId, customSelectId) {
    var select = $(selectId);
    var customSelect = $(customSelectId);
    var optionsList = customSelect.find('.options');

    // Hide the default select box
    select.hide();

    // Populate the options list
    select.find('option').each(function () {
      var optionValue = $(this).val();
      var optionText = $(this).text();
      optionsList.append('<li data-value="' + optionValue + '">' + optionText + '</li>');
    });

    // Set the first option as the default selected and active option
    var firstOption = optionsList.find('li').first();
    firstOption.addClass('active');
    var firstOptionValue = firstOption.attr('data-value');
    var firstOptionText = firstOption.text();
    customSelect.find('.select-style').text(firstOptionText);
    select.val(firstOptionValue);

    // Click event to toggle the options list
    customSelect.find('.select-style').on('click', function () {
      optionsList.toggle();
    });

    // Click event to select an option
    customSelect.find('.options li').on('click', function () {
      var selectedOptionValue = $(this).attr('data-value');
      var selectedOptionText = $(this).text();
      customSelect.find('.select-style').text(selectedOptionText);
      select.val(selectedOptionValue);
      optionsList.find('li').removeClass('active');
      $(this).addClass('active');
      optionsList.hide();

      // Trigger a change event on the hidden select
      select.trigger('change');
    });

    // Close the options list when clicking outside the select box
    $(document).on('click', function (event) {
      if (!$(event.target).closest(customSelectId).length) {
        optionsList.hide();
      }
    });
  }
  $(function () {
    initializeCustomSelect('#select-1', '#select-position');
  });
})(jQuery);
(function ($) {
  function handleActiveMenu() {
    $(document).ready(function () {
      $(".caret").click(function () {
        // Remove 'active' and 'caret-down' from all elements
        $(".nested").removeClass("active");
        $(".caret").removeClass("current-menu-parent");

        // Add 'active' and 'caret-down' to the clicked element
        $(this).find(".nested").addClass("active");
        $(this).addClass("current-menu-parent");
      });
    });
    if ($(".bm-archive-sidebar").find('.caret').hasClass('current-menu-parent')) {
      $('.bm-archive-sidebar .current-menu-parent').find(".nested").addClass("active");
    }
    if ($(".bm-archive-sidebar").find('.caret').hasClass('current_page_item')) {
      $('.bm-archive-sidebar .current_page_item').find(".nested").addClass("active");
    }
  }
  $(function () {
    handleActiveMenu();
  });
})(jQuery);
(function ($) {
  function handleScrollToTop() {
    $(document).on('click', '.bm-scroll-to-top', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
  }
  function handleDisplayScrollToTop() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if (scrollPosition >= scrollHeight - 100) {
      $('.bm-scroll-to-top').addClass('is-active');
    } else {
      $('.bm-scroll-to-top').removeClass('is-active');
    }
  }
  $(function () {
    handleScrollToTop();
    handleDisplayScrollToTop();
    $(window).scroll(function () {
      handleDisplayScrollToTop();
    });
  });
})(jQuery);
(function ($) {
  function DemoAdminBarMode() {
    $('#enable-admin-bar').on('change', function () {
      var adminBarModeStatus = $(this).prop('checked');
      if (adminBarModeStatus) {
        $('html').addClass('admin-bar-html');
        $('body').append('<div id="wpadminbar">WP Admin bar</div>').addClass('admin-bar');
      } else {
        $('html').removeClass('admin-bar-html');
        $('body').removeClass('admin-bar');
        $('#wpadminbar').remove();
        $('.js-bm-navbar').css('margin-top', '');
      }
      if ($(window).width() <= 600) {
        DemoNavbarMove();
        $(window).on('scroll', function () {
          DemoNavbarMove();
        });
      }
      function DemoNavbarMove() {
        var top = $(window).scrollTop(),
          offsetTop = 46 - top > 0 ? 46 - top : 0;
        if ($('#wpadminbar').length && $('.js-bm-navbar').length) {
          $('.js-bm-navbar').css('margin-top', offsetTop);
        } else {
          $('.js-bm-navbar').css('margin-top', '');
        }
      }
    });
  }
  $(function () {
    DemoAdminBarMode();
  });
})(jQuery);
(function ($) {
  var body = $('body');
  var scrollUp = "scroll-up";
  var scrollDown = "scroll-down";
  var clsException = "is-transparent";
  var lastScroll = 0;
  function handleNavCollapse() {
    $('.bm-header-toggler').on('click', function () {
      $(this).toggleClass('is-active');
      $('body').toggleClass('is-lock');
      // $('.bm-menu-header').toggleClass('is-active');
      $('header.bm-header ').toggleClass('is-active');
      $('.bm-header__desktop').toggleClass('is-show');
    });
  }
  function handleScrollMenu() {
    $(window).on('scroll', function () {
      calculateScroll();
    });
  }
  function calculateScroll() {
    var currentScroll = window.pageYOffset;

    // console.log(currentScroll);
    // console.log(lastScroll);
    if (body.hasClass(clsException)) {
      if (currentScroll > lastScroll && !body.hasClass(scrollDown)) {
        // down
        body.removeClass(scrollUp);
        body.addClass(scrollDown);
      } else if (currentScroll < lastScroll && body.hasClass(scrollDown)) {
        // up
        body.removeClass(scrollDown);
        body.addClass(scrollUp);
      }
      lastScroll = currentScroll;
      if (currentScroll <= 0) {
        body.removeClass(scrollUp);
        // return;
      }
    }
  }

  // function handleClickMenuButton() {
  //     $(document).on('click', '.bm-header__hamburger .btn', function(){
  //         if(document.body.classList.contains('opened-menu')) {
  //             $('body').removeClass('opened-menu is-lock');
  //             $(this).find('span').html(this.dataset.label);
  //             $(this).parents('.bm-header__head').each(function(){
  //                 $(this).removeClass('open');
  //                 $(this).removeAttr('style');
  //             });
  //         }
  //         else {
  //             $('body').addClass('opened-menu is-lock');
  //             $(this).find('span').html(this.dataset.close);
  //             $(this).parents('.bm-header__head').each(function(){
  //                 $(this).addClass('open');
  //                 $(this).css({
  //                     height: $('.bm-header__nav').height() + 150,
  //                     width: $('.bm-header__nav').outerWidth() + 60,
  //                 });
  //             });
  //         }
  //     });
  // }

  $(function () {
    handleNavCollapse();
    handleScrollMenu();
    calculateScroll();
  });
})(jQuery);
(function ($) {
  var paged = 1;
  function handleLoadNewsMore() {
    $(document).on('click', '.btn-ajax-read-more', function (e) {
      e.preventDefault();
      var element = $(this);
      var link = $(this).attr('data-url');
      var total = $(this).attr('data-total');
      paged++;
      link += '/page/' + paged;
      $.ajax({
        url: link,
        type: 'GET',
        cache: false,
        beforeSend: function beforeSend(xhr) {
          element.addClass('is-loading');
        }
      }).done(function (res) {
        var html = $(res);
        $('.bm-blog__inner--posts .posts-wrapper').append(html.find('.bm-blog__inner--posts .posts-wrapper').html());
        element.removeClass('is-loading');
        $('.lazy').Lazy({
          afterLoad: function afterLoad(elm) {
            $(elm).css('visibility', 'visible');
          }
        });
        if (parseInt(paged) >= parseInt(total)) {
          element.closest('.btn-readmore').addClass('d-none');
        }
      }).fail(function (res) {});
    });
  }
  $(function () {
    handleLoadNewsMore();
  });
})(jQuery);
(function ($) {
  // Hàm để chuyển đổi trạng thái menu
  var toggleMenu = function toggleMenu() {
    window.addEventListener('load', function () {
      // Chọn các phần tử
      var menuToggleButton = document.querySelector('.menu-toggle');
      var adminMenu = document.querySelector('.admin-menu');

      // Kiểm tra sự tồn tại của các phần tử trước khi thêm sự kiện
      if (menuToggleButton && adminMenu) {
        // Thêm sự kiện click
        menuToggleButton.addEventListener('click', function () {
          if (adminMenu.classList.contains('collapsed')) {
            adminMenu.classList.remove('collapsed');
            adminMenu.classList.add('expanded');
          } else {
            adminMenu.classList.remove('expanded');
            adminMenu.classList.add('collapsed');
          }
        });
      } else {
        console.log('Không tìm thấy phần tử menu-toggle hoặc admin-menu.');
      }
    });
  };
  $(function () {
    toggleMenu();
    $(window).on("resize", function () {});
  });
})(jQuery);
(function ($) {
  var showPassword = function showPassword() {
    window.addEventListener("load", function () {
      var togglePassword = document.querySelector(".togglePassword");
      if (togglePassword) {
        togglePassword.addEventListener("click", function () {
          var input = this.previousElementSibling;
          var inputType = input.getAttribute("type");

          // Toggle input type
          if (inputType === "password") {
            input.setAttribute("type", "text");
          } else {
            input.setAttribute("type", "password");
          }

          // Toggle icon classes
          this.classList.toggle("fa-eye");
          this.classList.toggle("fa-eye-slash");
        });
      } else {
        console.log('Không tìm thấy phần tử togglePassword.');
      }
    });
  };
  $(function () {
    showPassword();
    $(window).on("resize", function () {});
  });
})(jQuery);