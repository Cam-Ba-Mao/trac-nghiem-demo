"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  if ($('header.bm-header').length > 0) {
    root.style.setProperty("--mh", $('header.bm-header').outerHeight() + "px");
  }
}

// Hàm tạo thông báo
function toast(_ref) {
  var _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "info" : _ref$type,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 3000 : _ref$duration,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? "top-right" : _ref$position,
    _ref$dismissOthers = _ref.dismissOthers,
    dismissOthers = _ref$dismissOthers === void 0 ? false : _ref$dismissOthers,
    _ref$showCloseButton = _ref.showCloseButton,
    showCloseButton = _ref$showCloseButton === void 0 ? false : _ref$showCloseButton,
    _ref$redirect = _ref.redirect,
    redirect = _ref$redirect === void 0 ? '' : _ref$redirect;
  var main = document.getElementById("bm-toast");
  if (!main) {
    div = document.createElement("div");
    div.id = 'bm-toast';
    document.body.appendChild(div);
    main = document.getElementById("bm-toast");
  }
  if (main) {
    var _toast = document.createElement("div");

    // Xóa thông báo cũ nếu tồn tại
    if (main && main.firstChild && dismissOthers == true) {
      main.removeChild(main.firstChild);
    }
    switch (position) {
      case "top-left":
        main.style.top = "32px";
        main.style.left = "32px";
        main.style.right = "auto";
        main.style.bottom = "auto";
        break;
      case "top-right":
        main.style.top = "32px";
        main.style.right = "32px";
        main.style.left = "auto";
        main.style.bottom = "auto";
        break;
      case "bottom-left":
        main.style.bottom = "32px";
        main.style.left = "32px";
        main.style.top = "auto";
        main.style.right = "auto";
        break;
      case "bottom-right":
        main.style.bottom = "32px";
        main.style.right = "32px";
        main.style.top = "auto";
        main.style.left = "auto";
        break;
      default:
        main.style.top = "32px";
        main.style.right = "32px";
        main.style.left = "auto";
        main.style.bottom = "auto";
        break;
    }

    // Kiểm tra nếu debug bật, không ẩn thông báo
    if (debug == false) {
      // Tự động xóa thông báo
      var autoRemoveId = setTimeout(function () {
        // Kiểm tra xem toast có phải là con của main hay không
        if (main.contains(_toast)) {
          main.removeChild(_toast);
        }
        if (typeof redirect !== 'undefined' && redirect !== '') {
          window.location.href = redirect;
        }
      }, duration + 1000);

      // Xóa thông báo khi nhấp vào nút đóng
      _toast.onclick = function (e) {
        if (e.target.closest(".bm-toast__close")) {
          if (main.contains(_toast)) {
            main.removeChild(_toast);
          }
          clearTimeout(autoRemoveId);
        }
      };
    } else {
      _toast.style.animation = "slideInLeft ease .3s";
    }
    var icons = {
      success: '<path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#27A376"/>',
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: '<path d="M4.47012 20.9997H19.5301C21.0701 20.9997 22.0301 19.3297 21.2601 17.9997L13.7301 4.98969C12.9601 3.65969 11.0401 3.65969 10.2701 4.98969L2.74012 17.9997C1.97012 19.3297 2.93012 20.9997 4.47012 20.9997ZM12.0001 13.9997C11.4501 13.9997 11.0001 13.5497 11.0001 12.9997V10.9997C11.0001 10.4497 11.4501 9.99969 12.0001 9.99969C12.5501 9.99969 13.0001 10.4497 13.0001 10.9997V12.9997C13.0001 13.5497 12.5501 13.9997 12.0001 13.9997ZM13.0001 17.9997H11.0001V15.9997H13.0001V17.9997Z" fill="#E03137"/>'
    };
    var icon = icons[type];
    var delay = (duration / 1000).toFixed(2);
    _toast.classList.add("bm-toast", "bm-toast--".concat(type));
    if (debug == false) {
      _toast.style.animation = "slideInLeft ease .3s, fadeOut linear 1s ".concat(delay, "s forwards");
    } else {
      _toast.style.animation = "slideInLeft ease .3s";
    }
    _toast.innerHTML = "\n                            <div class=\"bm-toast__icon\">\n                                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    ".concat(icon, "\n                                </svg>\n                            </div>\n                            <div class=\"bm-toast__body\">\n                                <h3 class=\"bm-toast__title\">").concat(title, "</h3>\n                            </div>\n                            <div class=\"bm-toast__close\">\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41058 4.41107C4.73614 4.08551 5.26384 4.08551 5.5894 4.41107L10 8.82167L14.4106 4.41107C14.7362 4.08551 15.2638 4.08551 15.5894 4.41107C15.915 4.73663 15.915 5.26433 15.5894 5.58989L11.1788 10.0005L15.5894 14.4111C15.915 14.7366 15.915 15.2643 15.5894 15.5899C15.2638 15.9155 14.7362 15.9155 14.4106 15.5899L10 11.1793L5.5894 15.5899C5.26384 15.9155 4.73614 15.9155 4.41058 15.5899C4.08502 15.2643 4.08502 14.7366 4.41058 14.4111L8.82117 10.0005L4.41058 5.58989C4.08502 5.26433 4.08502 4.73663 4.41058 4.41107Z\" fill=\"#333333\"/>\n                                </svg>\n                            </div>\n                        ");
    // console.log(toast.querySelector('.bm-toast__close'));
    if (showCloseButton) {
      _toast.querySelector('.bm-toast__close').style.display = 'block';
    }
    main.appendChild(_toast);
  }
}
function initializeCustomSelect(_ref2) {
  var selectElement = _ref2.selectElement,
    customSelect = _ref2.customSelect,
    _ref2$showSearch = _ref2.showSearch,
    showSearch = _ref2$showSearch === void 0 ? false : _ref2$showSearch,
    _ref2$styleColor = _ref2.styleColor,
    styleColor = _ref2$styleColor === void 0 ? false : _ref2$styleColor;
  var selected = selectElement.value;
  var containerOption, optionsList;

  // Hide the default select box
  selectElement.style.display = 'none';
  var convertStringToSlug = function convertStringToSlug(str) {
    var slug;
    slug = str.toLowerCase().trim();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/[`~!@#$%^&*()+=,.?/<>:;"'_]/gi, '');
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/-{2,}/g, '-');
    return slug;
  };

  // Hàm đặt vị trí của danh sách dưới custom select
  function positionOptionsList() {
    if (containerOption) {
      var customSelectRect = customSelect.getBoundingClientRect();
      var customSelectHeight = customSelect.offsetHeight;
      var spacing = 4;
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      var adjustedLeft;
      var containerHeight = document.body.offsetHeight;
      var windowHeight = window.innerHeight;
      var marginBody = 8;
      var scrollbarWidthDefault = 17;
      if (scrollbarWidth !== scrollbarWidthDefault) {
        scrollbarWidth = (scrollbarWidthDefault - scrollbarWidth) / 2;
      }
      if (containerHeight > windowHeight) {
        adjustedLeft = customSelectRect.left + window.scrollX;
      } else {
        if (scrollbarWidth === scrollbarWidthDefault) {
          adjustedLeft = customSelectRect.left + window.scrollX + marginBody;
        } else {
          adjustedLeft = customSelectRect.left + window.scrollX + scrollbarWidth;
        }
      }

      // Điều chỉnh nếu danh sách bị tràn màn hình
      var dropdownWidth = containerOption.offsetWidth;
      var windowWidth = window.innerWidth;
      if (customSelectRect.left + dropdownWidth > windowWidth) {
        containerOption.style.left = windowWidth - dropdownWidth + "px";
      } else {
        containerOption.style.left = adjustedLeft + "px"; // Cập nhật left tại đây
      }

      // Adjust position of options list based on window height
      var optionsHeight = containerOption.offsetHeight;
      var topCustomSelect = customSelectRect.top + window.scrollY;
      if (windowHeight - customSelectRect.top < optionsHeight) {
        console.log('quay lên');
        containerOption.style.top = "".concat(topCustomSelect - optionsHeight - spacing, "px");
        containerOption.style.left = "".concat(adjustedLeft, "px");
        containerOption.style.width = "".concat(customSelect.offsetWidth, "px");
      } else {
        console.log('quay xuống');
        containerOption.style.top = "".concat(topCustomSelect + customSelectHeight + spacing, "px");
        containerOption.style.left = "".concat(adjustedLeft, "px");
        containerOption.style.width = "".concat(customSelect.offsetWidth, "px");
      }
    }
  }

  // Click event để mở hoặc đóng danh sách
  customSelect.querySelector('.select-style').addEventListener('click', function (e) {
    e.preventDefault();

    // Nếu danh sách tùy chọn đã tồn tại và đang hiển thị, ấn lần nữa sẽ đóng nó
    if (containerOption && containerOption.offsetWidth > 0 && containerOption.offsetHeight > 0) {
      containerOption.remove();
      customSelect.querySelector('.select-style').classList.remove('show');
      return;
    }

    // Tạo danh sách tùy chọn mới nếu nó chưa tồn tại hoặc bị ẩn
    containerOption = document.createElement('div');
    containerOption.className = 'custom-select-container';
    document.body.appendChild(containerOption);
    if (showSearch) {
      var searchContainer = document.createElement('div');
      searchContainer.className = 'custom-select-container__search';
      searchContainer.innerHTML = "<input class=\"tax-search\" type=\"text\" placeholder=\"T\xECm ki\u1EBFm...\">";
      containerOption.appendChild(searchContainer);
      searchContainer.querySelector('.tax-search').addEventListener('click', function (e) {
        e.stopPropagation();
      });
      searchContainer.querySelector('.tax-search').addEventListener('keyup', function () {
        var box = this.closest('.custom-select-container');
        var value = convertStringToSlug(this.value);
        box.querySelectorAll('.options > li').forEach(function (e) {
          var name = convertStringToSlug(e.textContent);
          e.style.display = name.search(value) !== -1 ? 'list-item' : 'none';
        });
      });
    }
    optionsList = document.createElement('ul');
    optionsList.className = 'options';
    containerOption.appendChild(optionsList);

    // Populate the options list
    Array.from(selectElement.options).forEach(function (option) {
      var optionValue = option.value;
      var optionText = option.textContent;
      var li = document.createElement('li');
      li.textContent = optionText;
      li.setAttribute('data-value', optionValue);

      // Kiểm tra và đặt trạng thái "active" cho tùy chọn đang chọn
      if (optionValue == selected) {
        li.classList.add('active');
      }
      if (styleColor) {
        var optionClass = option.getAttribute('data-class');
        li.setAttribute('data-class', optionClass);
      }
      optionsList.appendChild(li);
    });

    // Đặt vị trí của danh sách dưới select
    positionOptionsList();

    // Click event để chọn một tùy chọn
    optionsList.addEventListener('click', function (e) {
      var target = e.target;
      if (target.tagName === 'LI') {
        var selectedOptionValue = target.getAttribute('data-value');
        var selectedOptionText = target.textContent;

        // Cập nhật hiển thị của customSelect
        customSelect.querySelector('.select-style').classList.remove('show');
        customSelect.querySelector('.select-style span').textContent = selectedOptionText;
        selectElement.value = selectedOptionValue;
        if (styleColor) {
          var selectedClass = target.getAttribute('data-class');
          customSelect.querySelector('.select-style').className = 'select-style ' + selectedClass;
        }

        // Cập nhật trạng thái active cho tùy chọn
        optionsList.querySelectorAll('li').forEach(function (li) {
          return li.classList.remove('active');
        });
        target.classList.add('active');

        // Ẩn danh sách sau khi chọn
        containerOption.remove();

        // Kích hoạt sự kiện change trên select bị ẩn
        var event = new Event('change');
        selectElement.dispatchEvent(event);

        // Cập nhật giá trị selected
        selected = selectedOptionValue;
      }
    });

    // Thêm lớp 'show' để mở menu
    customSelect.querySelector('.select-style').classList.add('show');
  });

  // Đóng danh sách khi click ra ngoài customSelect
  document.addEventListener('click', function (event) {
    if (containerOption && containerOption.offsetWidth > 0 && containerOption.offsetHeight > 0 && !customSelect.contains(event.target)) {
      // Nếu không click vào customSelect hoặc containerOption, đóng danh sách
      customSelect.querySelector('.select-style').classList.remove('show');
      containerOption.remove();
    }
  });

  // Cập nhật vị trí khi cửa sổ bị thay đổi kích thước (resize)
  window.addEventListener('resize', function () {
    positionOptionsList();
  });

  // Khởi tạo trạng thái với tùy chọn đã chọn ban đầu
  var initialSelectedOption = selectElement.querySelector('option:checked');
  if (initialSelectedOption) {
    customSelect.querySelector('.select-style span').textContent = initialSelectedOption.textContent;
  }
  if (styleColor && initialSelectedOption) {
    customSelect.querySelector('.select-style').className = 'select-style ' + initialSelectedOption.getAttribute('data-class');
  }
}
function handleSelectBox(selectors) {
  var selectStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (selectors) {
    document.querySelectorAll(selectors).forEach(function (element) {
      initializeCustomSelect({
        selectElement: element,
        customSelect: element.closest('.custom-select'),
        showSearch: true
      });
    });
  }
  if (selectStatus) {
    document.querySelectorAll('.select-status-table').forEach(function (element) {
      initializeCustomSelect({
        selectElement: element,
        customSelect: element.closest('.select-status-edit'),
        styleColor: true
      });
    });
  }
}
handleSelectBox('.select-time, .select-status');

// initializeCustomSelect({
//     selectElement: document.querySelector('.select-time'),
//     customSelect: document.querySelector('.select-filter-time'),
//     showSearch: true
// });

// window.addEventListener('load', () => {   

//     const locomotiveScroll = new LocomotiveScroll({
//         lenisOptions: {
//             wrapper: window,
//             content: document.documentElement,
//             lerp: 0.1,
//             duration: 1.8,
//             orientation: 'vertical',
//             gestureOrientation: 'vertical',
//             smoothWheel: true,
//             smoothTouch: false,
//             wheelMultiplier: 1,
//             touchMultiplier: 2,
//             normalizeWheel: true,
//             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         },
//     });

//     const homeClass = $('.page-template-home').length;

//     // if (homeClass > 0) {
//     //     setTimeout(function(){
//     //         window.scrollTo(0, 0);

//     //     }, 10);
//     // }

// });

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
      $dynamicGallery.addEventListener('lgAfterSlide', function (event) {
        // const { index } = event.detail;
        // console.log('Slide loaded:', event.detail);

        var videoElement = document.querySelectorAll('.lg-video-cont iframe');
        videoElement.forEach(function (item) {
          if (item && item.src.indexOf('mute=1') > -1) {
            item.src = item.src.replace('mute=1', 'mute=0');
          }
        });
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
        plugins: [lgVideo, lgAutoplay, lgThumbnail],
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
  function handleRating() {
    if ($('.is-rating select').length > 0) {
      $('.is-rating select').hide().before('<div class="rt-stars">\
                    <span>\
                        <a class="star-1" href="#">1</a>\
                        <a class="star-2" href="#">2</a>\
                        <a class="star-3" href="#">3</a>\
                        <a class="star-4" href="#">4</a>\
                        <a class="star-5" href="#">5</a>\
                    </span>\
                </div>');
    }
    $(document).on('click', '.is-rating .rt-stars a', function (e) {
      e.preventDefault();
      var $star = $(this),
        $rating = $(this).closest('.is-rating').find('select'),
        $container = $(this).closest('.rt-stars');
      $rating.val($star.text());
      $star.siblings('a').removeClass('active');
      $star.addClass('active');
      $container.addClass('selected');
    });
  }
  $(function () {
    getRootVars();
    initLazyLoad();
    // initSelect2();
    initPopup();
    handleWordpressAdminMode();
    initFormFloatLabel();
    initAnchorScroll();
    handleLightGallery();
    handleRating();
  });
  $(window).on('resize', function () {
    getRootVars();
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
    // initializeCustomSelect('#select-1', '#select-position');   
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
  function initSliderFeaturedEvents() {
    if ($('.isa-featured-events__list').length < 1) return;
    var swiper = new Swiper('.isa-featured-events__list', {
      speed: 400,
      slidesPerView: 1.1,
      spaceBetween: 16,
      loop: true,
      allowSlideNext: true,
      pagination: {
        el: ".isa-featured-events__pagination--bulet",
        clickable: true
      },
      navigation: {
        nextEl: '.isa-featured-events__arrow--next',
        prevEl: '.isa-featured-events__arrow--prev'
      },
      breakpoints: {
        1400: {
          slidesPerView: 2.7
        },
        1024: {
          slidesPerView: 2.1
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 1.7
        },
        576: {
          slidesPerView: 1.4,
          spaceBetween: 24
        }
      }
    });
  }
  function handleHoverFeaturedEvents() {
    // $(".isa-why-us__item").each(function () {    
    //     let headHeight = $(this).find('.isa-why-us__item--head').outerHeight();
    //     let bodyHeight = $(this).find('.isa-why-us__item--body').outerHeight();
    //     console.log(headHeight)
    //     let itemHeight = headHeight + bodyHeight
    //     $(this).attr('style', '--itemHeight:' + itemHeight + 'px; --headHeight:' + headHeight + 'px'); 
    // });

    $('.isa-featured-events__item').on({
      mouseenter: function mouseenter() {
        $(this).find('.isa-ticket').addClass('is-hover');
      },
      mouseleave: function mouseleave() {
        $(this).find('.isa-ticket').removeClass('is-hover');
      }
    });
  }
  function handlePostMore() {
    var showChar = 50;
    var ellipsestext = "...";
    $(".isa-ticket__inner--left").find('h3').each(function () {
      var content = $(this).html();
      if (content.length > showChar) {
        var c = content.substr(0, showChar);
        var h = content.substr(showChar, content.length - showChar);
        var html = c + '<span class="moreellipses">' + ellipsestext + '</span>';
        $(this).html(html);
      }
    });
  }
  $(function () {
    initSliderFeaturedEvents();
    handleHoverFeaturedEvents();
    $(window).on("resize", function () {});
    $(document).ready(function () {
      // handlePostMore();
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
  function toggleDropdown() {
    document.addEventListener('click', function (e) {
      var button = e.target.closest(".avatar-container");
      if (button) {
        document.getElementById("dropdownMenu").classList.toggle("show");
      }
    });
  }
  window.onclick = function (event) {
    if (!event.target.matches('.avatar')) {
      var dropdowns = document.getElementsByClassName("dropdown-menu");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  $(function () {
    toggleDropdown();
  });
})(jQuery);
// (function ($) {
//     const body = $('body');
//     const scrollUp = "scroll-up";
//     const scrollDown = "scroll-down";
//     const clsException = "is-transparent";
//     var lastScroll = 0;

//     function handleNavCollapse() {
//         $('.bm-header-toggler').on('click', function () {
//             $(this).toggleClass('is-active');

//             $('body').toggleClass('is-lock');
//             // $('.bm-menu-header').toggleClass('is-active');
//             $('header.bm-header ').toggleClass('is-active');
//             $('.bm-header__desktop').toggleClass('is-show');

//         });
//     }

//     function handleScrollMenu() {
//         $(window).on('scroll', function () {
//             calculateScroll();
//         });
//     }

//     function calculateScroll() {
//         var currentScroll = window.pageYOffset;

//         // console.log(currentScroll);
//         // console.log(lastScroll);
//         if (body.hasClass(clsException)) {
//             if (currentScroll > lastScroll && !body.hasClass(scrollDown)) {
//                 // down
//                 body.removeClass(scrollUp);
//                 body.addClass(scrollDown);

//             } else if (currentScroll < lastScroll && body.hasClass(scrollDown)) {
//                 // up
//                 body.removeClass(scrollDown);
//                 body.addClass(scrollUp);
//             }

//             lastScroll = currentScroll;

//             if (currentScroll <= 0) {
//                 body.removeClass(scrollUp);
//                 // return;
//             }
//         }
//     }

//     // function handleClickMenuButton() {
//     //     $(document).on('click', '.bm-header__hamburger .btn', function(){
//     //         if(document.body.classList.contains('opened-menu')) {
//     //             $('body').removeClass('opened-menu is-lock');
//     //             $(this).find('span').html(this.dataset.label);
//     //             $(this).parents('.bm-header__head').each(function(){
//     //                 $(this).removeClass('open');
//     //                 $(this).removeAttr('style');
//     //             });
//     //         }
//     //         else {
//     //             $('body').addClass('opened-menu is-lock');
//     //             $(this).find('span').html(this.dataset.close);
//     //             $(this).parents('.bm-header__head').each(function(){
//     //                 $(this).addClass('open');
//     //                 $(this).css({
//     //                     height: $('.bm-header__nav').height() + 150,
//     //                     width: $('.bm-header__nav').outerWidth() + 60,
//     //                 });
//     //             });
//     //         }
//     //     });
//     // }

//     $(function () {
//         handleNavCollapse();
//         handleScrollMenu();
//         calculateScroll();
//     });

// })(jQuery);
(function ($) {
  function handleDetailMeetTheTeam() {
    if ($('.rt-meet-the-team__item').length < 1) return;
    $(document).on('click', '.rt-meet-the-team__item', function (e) {
      e.preventDefault();
      var element = $(this);
      var modal = $('#popup-detail-team');
      if (modal.length) {
        var image = $(element).find('.rt-meet-the-team__item--img-popup img').length > 0 ? $(element).find('.rt-meet-the-team__item--img-popup img').attr('src') : '';
        var title = $(element).find('.rt-meet-the-team__item--wrap .title').length > 0 ? $(element).find('.rt-meet-the-team__item--wrap .title').text() : '';
        var data = $(element).find('.rt-meet-the-team__item--content').html();
        if (image.length > 0) {
          modal.find('.rt-popup-detail-team__image img').attr('src', image);
          modal.find('.rt-popup-detail-team__image').removeClass('d-none');
        } else {
          modal.find('.rt-popup-detail-team__image').addClass('d-none');
        }
        if (title.length > 0) {
          modal.find('.rt-popup-detail-team__title').html(title);
          modal.find('.rt-popup-detail-team__title').removeClass('d-none');
        } else {
          modal.find('.rt-popup-detail-team__title').addClass('d-none');
        }
        if (data.length > 0) {
          modal.find('.rt-popup-detail-team__content').html(data);
          modal.find('.rt-popup-detail-team__content').removeClass('d-none');
        } else {
          modal.find('.rt-popup-detail-team__content').addClass('d-none');
        }
        modal.modal('show');
      }
    });
  }
  $(function () {
    handleDetailMeetTheTeam();
  });
})(jQuery);
(function ($) {
  var sliderInstances = {};
  function initStrategicPartnershipSlider(elementTop, tabId) {
    if ($('.isa-strategic-partnership__list').length < 1) return;

    // console.log(sliderInstances);

    if (sliderInstances[tabId]) {
      // Slider đã được khởi tạo, không khởi tạo lại
      return;
    }
    var sliderUniversity = new Swiper(elementTop, {
      slidesPerView: 1.4,
      spaceBetween: 16,
      loop: true,
      lazy: true,
      speed: 500,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
      },
      on: {
        init: function init() {
          $('.isa-strategic-partnership__list .lazy').Lazy({
            afterLoad: function afterLoad(el) {
              $(el).addClass('loaded');
              // handleIE();
            }
          });
          handleMatchHeight();
        },
        afterInit: function afterInit() {
          $('.isa-strategic-partnership__list .lazy').Lazy({
            afterLoad: function afterLoad(el) {
              $(el).addClass('loaded');
              // handleIE();
            }
          });
          handleMatchHeight();
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $('.isa-strategic-partnership__list .lazy').Lazy({
            afterLoad: function afterLoad(el) {
              $(el).addClass('loaded');
              // handleIE();
            }
          });
          handleMatchHeight();
        },
        resize: function resize() {
          $('.isa-strategic-partnership__list .lazy').Lazy({
            afterLoad: function afterLoad(el) {
              $(el).addClass('loaded');
              // handleIE();
            }
          });
          handleMatchHeight();
        }
      },
      navigation: {
        nextEl: '.isa-strategic-partnership__arrow .isa-swiper-next',
        prevEl: '.isa-strategic-partnership__arrow .isa-swiper-prev'
      },
      breakpoints: {
        480: {
          spaceBetween: 16,
          slidesPerView: 2
        },
        992: {
          spaceBetween: 24,
          slidesPerView: 3
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      }
    });

    // $(elementTop).mouseenter(function() {
    //     sliderUniversity.autoplay.pause();
    //     console.log('slider pause');
    // });

    // $(elementTop).mouseleave(function() {
    //     sliderUniversity.autoplay.resume();
    //     console.log('slider resume again');
    // });

    sliderInstances[tabId] = sliderUniversity;
  }
  function handleStrategicPartnershipTab() {
    $('.isa-strategic-partnership__mobile li').click(function () {
      var position = $(this).position();
      var scroll = $('.isa-strategic-partnership__mobile').scrollLeft();
      $('.isa-strategic-partnership__mobile').animate({
        'scrollLeft': scroll + position.left - 30
      }, 200);
    });
    if ($('#StrategicTabContent .tab-pane.active').length > 0) {
      var elementTop = '#StrategicTabContent .tab-pane.active .isa-strategic-partnership__list';
      var tabId = $('#StrategicTabContent .tab-pane.active').attr('id');
      initStrategicPartnershipSlider(elementTop, tabId);
    }
    $('.isa-strategic-partnership__nav button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
      var elementTop = '#StrategicTabContent .tab-pane.active .isa-strategic-partnership__list';
      var tabId = $('#StrategicTabContent .tab-pane.active').attr('id');
      initStrategicPartnershipSlider(elementTop, tabId);
    });
  }
  function handleMatchHeight() {
    if ($('.isa-strategic-partnership__item--logo').length > 0) {
      $('.isa-strategic-partnership__item--logo').matchHeight();
    }
  }
  $(function () {
    handleStrategicPartnershipTab();
    initStrategicPartnershipSlider();
    $(window).on("resize", function () {});
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
function showSuccessToast() {
  toast({
    // debug: true,
    title: "Cập nhật trạng thái thành công",
    type: "success",
    duration: 5000,
    position: "top-right",
    dismissOthers: true,
    showCloseButton: true
  });
}
function showErrorToast() {
  toast({
    title: "Thất bại",
    type: "error",
    duration: 5000,
    position: "top-right",
    dismissOthers: false,
    showCloseButton: true
  });
}
BMplaceholderTypewriter('#search-animation', {
  delay: 50,
  pause: 1000,
  text: ["Bạn cần tìm gì..", "Nhập tên sản phẩm.."]
});
function toggleRow(button) {
  var tr = button.closest('tr');
  var table = tr.closest('table');
  var colspan = $(tr).find('td:not(.toggle-btn)').length;
  var toggleRow = "<tr class=\"table-row\" data-id=\"".concat(tr.dataset.id, "\"><td colspan=\"").concat(colspan, "\">");
  var toggleIcon = {
    close: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7 7C7 6.44772 7.44772 6 8 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H8C7.44772 8 7 7.55228 7 7Z\" fill=\"#111827\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12Z\" fill=\"#111827\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7 17C7 16.4477 7.44772 16 8 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H8C7.44772 18 7 17.5523 7 17Z\" fill=\"#111827\"/>\n                    <path d=\"M5 7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6C4.55228 6 5 6.44772 5 7Z\" fill=\"#111827\"/>\n                    <path d=\"M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12Z\" fill=\"#111827\"/>\n                    <path d=\"M5 17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16C4.55228 16 5 16.44772 5 17Z\" fill=\"#111827\"/>\n                </svg>",
    open: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z\" fill=\"#111827\"/>\n                </svg>"
  };
  $(table).find('.table-row').remove();
  $(table).find('.toggle-btn').html(toggleIcon.close);
  $(table).find('thead th').each(function (i, e) {
    if (i) {
      var value = $(tr).find('.column-' + e.id).html();
      toggleRow += "<div class=\"field-mobile field-".concat(e.id, "\"><strong>").concat(e.textContent, ": </strong>").concat(value, "</div>");
    }
  });
  toggleRow += '</td></tr>';
  if (tr.classList.contains('is-toggle')) {
    tr.classList.remove('is-toggle');
    $(table).find('.toggle-btn').html(toggleIcon.close);
  } else {
    $(table).find('tr').removeClass('is-toggle');
    $(toggleRow).insertAfter($(tr)).ready(function () {
      tr.classList.add('is-toggle');
      $(button).html(toggleIcon.open);
    });
  }
}
function handleRichEditors() {
  var optionsById = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elems = document.querySelectorAll(".tinymce-editor");
  if (elems.length === 0) {
    return null;
  }
  if (typeof themeUri === 'undefined') {
    themeUri = '..';
  }
  elems.forEach(function (item) {
    if (typeof tinymce !== 'undefined' && typeof themeUri !== 'undefined' && item.id !== '') {
      // Các option mặc định chung
      var defaultOptions = {
        selector: '#' + item.id,
        height: 400,
        menubar: false,
        resize: true,
        language: 'vi',
        plugins: 'lists link media image advlist anchor autolink autoresize autosave charmap code directionality emoticons fullscreen help preview quickbars save searchreplace table visualblocks wordcount',
        toolbar: 'styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | forecolor backcolor lists link media image advlist anchor autolink autoresize autosave charmap code directionality emoticons fullscreen help preview quickbars save searchreplace table visualblocks wordcount',
        branding: false,
        // content_css: [themeUri + '/assets/dist/js/tinymce/custom.min.css?' + new Date().getTime()],
        setup: function setup(editor) {
          editor.on('keyup', function (e) {
            item.value = tinymce.activeEditor.getContent();
          });
        }
      };

      // Lấy các options riêng theo ID
      var customOptions = optionsById[item.id] || {};

      // Kết hợp các options mặc định với các options riêng
      var editorOptions = Object.assign({}, defaultOptions, customOptions);
      tinymce.init(editorOptions);
    }
  });
}
(function ($) {
  var handleUpload = function handleUpload() {
    var form = document.getElementById('demo-upload');
    if (form) {
      Dropzone.autoDiscover = false;
      new Dropzone('#demo-upload', {
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 5,
        // MB
        acceptedFiles: 'image/*',
        dictFileTooBig: "Tệp quá lớn ({{filesize}}MB). Tối đa cho phép: {{maxFilesize}}MB.",
        dictInvalidFileType: "Bạn không thể tải lên các tập tin loại này.",
        success: function success(file, response) {
          toast({
            type: "success",
            position: "top-right",
            title: "Hình ảnh đã được tải lên thành công.",
            redirect: response.redirect
          });
        },
        error: function error(file, message) {
          toast({
            type: "error",
            position: "top-right",
            title: message
          });
          form.classList.remove('dz-started');
          $(form).find('.dz-preview').remove();
          return false;
        }
      });
    }
  };
  function initFeelingParentSlider() {
    if ($(".bm-feeling-parent__slider").length < 1) return;
    var duration = document.querySelector(".bm-feeling-parent__slider").getAttribute("data-duration");
    var swiper = new Swiper(".bm-feeling-parent__slider", {
      speed: 500,
      slidesPerView: 1.3,
      spaceBetween: 16,
      // loop: true,
      autoplay: {
        delay: duration * 1000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.bm-feeling-parent__navigation .button-next',
        prevEl: '.bm-feeling-parent__navigation .button-prev'
      },
      breakpoints: {
        1024: {
          slidesPerView: 3.2
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2.6
        }
      }
    });
  }
  function createCustomLegend(chart) {
    var legendHtml = [];
    var item = chart.data.datasets[0];
    for (var i = 0; i < item.data.length; i++) {
      legendHtml.push('<li>');
      legendHtml.push('<div class="legend-request__wrap">');
      legendHtml.push('<span class="legend-request__wrap--circle" style="background-color:' + item.backgroundColor[i] + '"></span>');
      legendHtml.push('<span class="legend-request__wrap--title">' + chart.data.labels[i] + '</span>');
      legendHtml.push('</div>');
      legendHtml.push('<span class="legend-request__value">' + item.data[i] + '</span>');
      legendHtml.push('</li>');
    }
    return '<ul>' + legendHtml.join('') + '</ul>';
  }
  function chartInit(canvas, config) {
    var ctx = document.getElementById(canvas);
    if (!ctx) {
      return; // Ngừng thực hiện nếu không có canvas
    }
    if (!config) {
      config = {
        chart: {
          totalSum: 8,
          dataValues: [6, 1, 1],
          labels: ["Chưa liên hệ", "Chưa nghe máy", "Đã liên hệ"],
          backgroundColor: ["#E03137", "#E6BB20", "#0CAF60"]
        }
      };
    }
    var totalSum = config.chart.totalSum;
    var dataValues = config.chart.dataValues;
    var legendElement = document.getElementById('my-legend-request');
    var centerTextPlugin = {
      id: 'centerTextPlugin',
      beforeDraw: function beforeDraw(chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        var centerX = Math.round(width / 2);
        var centerY = Math.round(height / 2);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        var mainText = chart.config.options.elements.center.text;
        var subText = $('#doughnutChart').attr('data-total');
        var mainFontSize = 32;
        var subFontSize = 16;
        ctx.font = "700 " + mainFontSize + "px SF Pro Display, Arial, Helvetica, sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(mainText, centerX, centerY - subFontSize / 2);
        ctx.font = subFontSize + "px sans-serif";
        ctx.fillText(subText, centerX, centerY + 10 + mainFontSize / 2);
        ctx.save();
      }
    };
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: config.chart.labels,
        datasets: [{
          data: dataValues,
          backgroundColor: config.chart.backgroundColor,
          borderRadius: 6,
          spacing: 3
        }]
      },
      options: {
        elements: {
          center: {
            text: totalSum
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function label(context) {
                var label = $('#doughnutChart').attr('data-quantity');
                label = "\n" + label;
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                }
                return label;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: 90
      }
    });
    Chart.register(centerTextPlugin);
    window.addEventListener('beforeprint', function () {
      myChart.resize(600, 600);
    });
    window.addEventListener('afterprint', function () {
      myChart.resize();
    });
    if (legendElement) {
      legendElement.innerHTML = createCustomLegend(myChart);
    }
  }
  function handleButtonViewImage() {
    document.addEventListener('click', function (e) {
      var button = e.target.closest(".btn-view-image");
      if (button) {
        // console.log('Button clicked');

        var id = button.closest('tr').dataset.id;
        var row = document.querySelector('[data-id="' + id + '"]');
        var img = row.querySelector('img');
        var index = 0;
        var i = 0;
        var sources = [];
        var element = button.closest('tbody');
        if (img) {
          var imgUrl = img.getAttribute('src');
          var images = element.querySelectorAll('img');
          if (images.length > 0) {
            images.forEach(function (imgElement, e) {
              if (imgElement.getAttribute('src') === imgUrl) {
                index = i;
              }
              var source = {
                "src": imgElement.getAttribute('src'),
                "thumb": imgElement.getAttribute('src')
              };
              sources.push(source);
              i++;
            });
          }
          var dynamicGallery = window.lightGallery(button, {
            dynamic: true,
            plugins: [lgVideo, lgAutoplay, lgThumbnail],
            dynamicEl: sources,
            download: false,
            counter: false,
            slideShowAutoplay: sources.length > 1,
            autoplayControls: true,
            autoplayVideoOnSlide: true,
            showCloseIcon: true,
            mobileSettings: {
              controls: true,
              showCloseIcon: true
            }
          });
          dynamicGallery.openGallery(index);
        }
      }
    });
  }
  function handleMatchHeightTimeRegulationsBullet() {
    if ($('.bm-time-regulations-bullet__title').length > 0) {
      $('.bm-time-regulations-bullet__title').matchHeight();
    }
  }
  function initTimeRegulationsSlider(paginationData) {
    if ($('.bm-time-regulations__list').length < 1) return;

    // let paginationData;

    // Kiểm tra nếu biến chưa được khởi tạo thì khởi tạo lại
    if (typeof paginationData === 'undefined') {
      paginationData = [{
        icon: {
          url: "/images/styleguide/time-regulations-icon-1.svg"
        },
        title: "Nộp hồ sơ",
        time: "20/04  - 02/05/2023"
      }, {
        icon: {
          url: "/images/styleguide/time-regulations-icon-2.svg"
        },
        title: "Thi Viết Luận (Tại trường)",
        time: "20/04  - 02/05/2023"
      }, {
        icon: {
          url: "/images/styleguide/time-regulations-icon-3.svg"
        },
        title: "Phỏng vấn cùng Ban Giám Hiệu",
        time: "20/04  - 02/05/2023"
      }, {
        icon: {
          url: "/images/styleguide/time-regulations-icon-4.svg"
        },
        title: "Công bố học bổng",
        time: "20/04  - 02/05/2023"
      }];
    }

    // console.log(paginationData);
    var lang = $('html').attr('lang');
    if (lang == 'vi') {
      var timetext = " Thời gian:";
    } else {
      var timetext = " Time:";
    }
    var mySwiper = new Swiper('.bm-time-regulations__list', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      speed: 400,
      slidesPerView: 1,
      spaceBetween: 52,
      // loop: true,
      allowSlideNext: true
    }, "spaceBetween", 0), "initialSlide", 1), "slidesPerView", 1), "effect", "fade"), "autoplay", {
      delay: 3e3,
      waitForTransition: !1
    }), "allowTouchMove", !1), "simulateTouch", !1), "on", {
      afterInit: function afterInit() {
        handleMatchHeightTimeRegulationsBullet();
      }
    }), "pagination", {
      el: ".bm-time-regulations__pagination",
      clickable: true,
      type: "bullets",
      bulletClass: "bm-time-regulations-bullet",
      bulletActiveClass: "bm-time-regulations-bullet__active",
      renderBullet: function renderBullet(index, className) {
        if (paginationData[index]) {
          // kiểm tra xem phần tử tại index có tồn tại không
          var item = paginationData[index];
          return '<button class="' + className + '">' + '<span class="bm-time-regulations-bullet__image">' + '<img src="' + item.icon['url'] + '" alt="" />' + '</span>' + '<span class="bm-time-regulations-bullet__title">' + item.title + '</span>' + '<span class="bm-time-regulations-bullet__item"> ' + '<span class="line"></span>' + '<span class="bullet"></span>' + '</span>' + '<span class="bm-time-regulations-bullet__time">' + timetext + '<br /><span>' + item.time + '</span></span>' + '</button>';
          // return (
          //     '<button class="' +className +'"><span class="bm-time-regulations-bullet__time">' +
          //     item.time +
          //     '</span><span class="bm-time-regulations-bullet__item"><span class="line"></span><span class="bullet"></span></span><span class="bm-time-regulations-bullet__title">' +
          //     item.title +
          //     "</span></button>"
          // );
        }
      }
    }));
    var soSlide = mySwiper.slides.length / mySwiper.params.slidesPerView;
    // console.log(soSlide); 
    $('.bm-time-regulations').find('.container-fluid').attr('style', '--slides-count:' + soSlide);
    //slidesPerView được thiết lập thành 4, do đó mỗi swiper-slide sẽ có chiều rộng bằng 1/4 chiều rộng của container Swiper. 
    //Biến soSlide sẽ tính toán số swiper-slide hiện có trong Swiper bằng cách chia tổng số slide cho slidesPerView
  }
  function handleIntro() {
    if ($('.bm-intro__wrap').length > 0) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function minWidth768px() {
          var tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".bm-intro__wrap",
              scrub: 1.5,
              start: "top bottom",
              end: "top top"
            }
          });
          tl2.from(".bm-intro__wrap .photo.left", {
            transform: "translate3d(100%, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1)"
          }).from(".bm-intro__wrap .photo.right", {
            transform: "translate3d(-100%, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1)"
          }, 0).to(".bm-intro__wrap .photo.left", {
            transform: "translate3d(-10%, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(-3deg) scale3d(1,1,1)"
          }, 0).to(".bm-intro__wrap .photo.right", {
            transform: "translate3d(10%, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(3deg) scale3d(1,1,1)"
          }, 0);
        },
        "(max-width: 767px)": function maxWidth767px() {
          var tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".bm-intro__wrap",
              scrub: 1.5,
              start: "top 60%",
              end: "top top"
            }
          });
          tl2.from(".bm-intro__wrap .photo.left", {
            transform: "translate3d(100%, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1)"
          }).from(".bm-intro__wrap .photo.right", {
            transform: "translate3d(-100%, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1)"
          }, 0).to(".bm-intro__wrap .photo.left", {
            transform: "translate3d(32px, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1)"
          }, 0).to(".bm-intro__wrap .photo.right", {
            transform: "translate3d(-32px, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1)"
          }, 0);
        }
      });
    }
  }
  var isRunCounter = false;
  function handleCounterNumber() {
    if ($('.bm-number__item--number').length < 1) return;
    if (isRunCounter) return;
    var elValFromTop;
    var windowHeight = $(window).height(),
      windowScrollValFromTop = $(window).scrollTop();
    elValFromTop = Math.ceil($('.bm-number__item--number').offset().top);
    if (windowHeight + windowScrollValFromTop > elValFromTop) {
      counter();
      isRunCounter = true;
    }
  }
  function counter() {
    if ($('.bm-number__item--number').length < 1) return false;
    $('.bm-number__item--number').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 3000,
        easing: 'swing',
        step: function step(now) {
          now = Math.ceil(now);
          if (now.toString().length < 2) {
            now = '0' + now.toString();
          } else {
            now = new Intl.NumberFormat('de-DE').format(Math.ceil(now));
          }
          $(this).text(now);
        }
      });
    });
  }
  function handleClickTabWhyJoin() {
    $(".bm-why-join .nav-link").hover(function () {
      $(this).tab('show');
    });
    $(document).on('click', '.bm-why-join__arrow--prev', function (e) {
      e.preventDefault();
      var index = $('.bm-why-join__body .nav-link.active').index();
      var total = $('.bm-why-join__body .nav-link').length;
      index--;
      index = index < 0 ? total - 1 : index;
      $('.bm-why-join__body .nav-link:eq(' + index + ')').trigger('click');
    });
    $(document).on('click', '.bm-why-join__arrow--next', function (e) {
      e.preventDefault();
      var index = $('.bm-why-join__body .nav-link.active').index();
      var total = $('.bm-why-join__body .nav-link').length;
      index++;
      index = index >= total ? 0 : index;
      $('.bm-why-join__body .nav-link:eq(' + index + ')').trigger('click');
    });
  }
  var myTimeoutHover;
  function handleCardWhyUs() {
    $(".isa-why-us__item").each(function () {
      var headHeight = $(this).find('.isa-why-us__item--head').outerHeight();
      var bodyHeight = $(this).find('.isa-why-us__item--body').outerHeight();
      var itemHeight = headHeight + bodyHeight;
      $(this).attr('style', '--itemHeight:' + itemHeight + 'px; --headHeight:' + headHeight + 'px');
    });
    $(".isa-why-us__list .isa-why-us__item").hover(function () {
      var _this = this;
      clearTimeout(myTimeoutHover);
      myTimeoutHover = setTimeout(function () {
        $('.isa-why-us__list .isa-why-us__item').removeClass('is-active');
        $(_this).addClass('is-active');
      }, 100);
    });
  }
  function addClassToElements(elements, index) {
    var maxIndex = Math.min(index + 1, elements.length);
    for (var i = 0; i < maxIndex; i++) {
      elements.eq(i).addClass('active');
    }
    elements.not(':lt(' + maxIndex + ')').removeClass('active');
  }
  function handleTabProgram() {
    var tabsNav = $('.advant__tabs-nav');
    var images = $('.advant__img');
    var imagesCard = $('.advant__card-img');
    var txtCard = $('.advant__card-txt');
    tabsNav.on('click', '.btn-tag', function (e) {
      var index = $(this).index();
      tabsNav.find('.btn-tag').removeClass('active');
      $(this).addClass('active');
      addClassToElements(images, index);
      addClassToElements(imagesCard, index);
      addClassToElements(txtCard, index);
    });
  }
  var handlePromotion = function handlePromotion() {
    $("#siss-promotion .siss-tabs a").on("click", function (e) {
      e.preventDefault();
      if (this.classList.contains("active")) {
        return false;
      }
      var id = this.href.split("#")[1],
        item = document.getElementById(id),
        node = document.getElementById("siss-promotion");
      $(node).find(".siss-tabs a").removeClass("active");
      $(this).addClass("active");
      $(node).find(".siss-promotion__panel.active").css({
        opacity: 0,
        transform: "translateY(50%) scale(1.06)"
      });
      $(node).find(".siss-promotion__panel.active").animate({
        opacity: 0
      }, 300, function () {
        $(item).addClass("active");
        $(this).removeAttr("style");
        $(this).removeClass("active");
      });
    });
  };
  function handleBuildingGreatness() {
    $(document).on('click', '.rt-building-greatness__item', function (e) {
      var element = $(this);
      $('.rt-building-greatness__item').removeClass('is-active');
      element.addClass('is-active');
      $('.rt-building-greatness__item video').each(function () {
        this.pause();
      });
      $('.rt-building-greatness__item video').prop('preload', 'none');
      $('.rt-building-greatness__item video').prop('autoplay', false);
      if (element.hasClass('is-active')) {
        element.find("video").prop('preload', 'auto');
        element.find("video").prop('autoplay', true);
        element.find("video")[0].currentTime = 0;
        element.find("video")[0].play();
      }
      var position = $(this).position();
      var scroll = $('.rt-building-greatness__scroll').scrollLeft();
      var containerWidth = $('.rt-building-greatness__scroll').width();
      var tabWidth = $('.rt-building-greatness__list').width();
      if (position.left > containerWidth) {
        // Calculate the distance to scroll to the right
        var scrollDistance = position.left - containerWidth + $(this).width() + 30;

        // Ensure we don't scroll beyond the tab content
        if (scroll + containerWidth + scrollDistance > tabWidth) {
          scrollDistance = tabWidth - containerWidth - scroll;
        }
        $('.rt-building-greatness__scroll').animate({
          'scrollLeft': scroll + scrollDistance
        }, 200);
      } else {
        $('.rt-building-greatness__scroll').animate({
          'scrollLeft': scroll + position.left - 400
        }, 200);
      }
    });
  }
  function calculateBuildingGreatness() {
    if ($('.rt-building-greatness__item').length < 1) return;
    var numberItems = $('.rt-building-greatness__item').length;
    $('.rt-building-greatness__list').attr('style', '--number-items: ' + numberItems);
  }
  function handleSliderBuildingGreatness() {
    if ($('.rt-building-greatness__slider').length < 1) return;
    var BuildingGreatness = new Swiper('.rt-building-greatness__slider', {
      slidesPerView: 1.4,
      spaceBetween: 16,
      loop: true,
      on: {
        afterInit: function afterInit() {
          $('.rt-building-greatness__slider .lazy').Lazy({
            afterLoad: function afterLoad(el) {
              $(el).addClass('loaded');
              // handleIE();
            }
          });
        },
        slideChange: function slideChange() {
          $('.rt-building-greatness__slider .lazy').Lazy({
            afterLoad: function afterLoad(el) {
              $(el).addClass('loaded');
              // handleIE();
            }
          });
        }
      },
      breakpoints: {
        // when window width is >= 320px
        375: {
          slidesPerView: 1.6
        },
        576: {
          spaceBetween: 24,
          slidesPerView: 2.8
        }
      }
    });
    BuildingGreatness.on('slideChange', function () {
      $('.swiper-slide .rt-building-greatness__item--video video').each(function () {
        this.pause();
      });
      $('.swiper-slide .rt-building-greatness__item--video video').prop('preload', 'none');
      $('.swiper-slide .rt-building-greatness__item--video video').prop('autoplay', false);
      setTimeout(function () {
        var activeSlide = $('.swiper-slide.swiper-slide-active');
        activeSlide.find(".rt-building-greatness__item--video video").prop('preload', 'auto');
        activeSlide.find(".rt-building-greatness__item--video video").prop('autoplay', true);
        var videoElement = activeSlide.find(".rt-building-greatness__item--video video")[0];
        videoElement.currentTime = 0;
        videoElement.play();

        // let video = activeSlide.find(".rt-building-greatness__item--video video");
        // console.log('Preload:', video.prop('preload'));
        // console.log('Autoplay:', video.prop('autoplay'));
      }, 100);
    });
  }
  function handleScrollBusinessField() {
    if ($('.rt-home-business-field').length > 0) {
      var businessField = $(".rt-home-business-field");
      var businessFieldInner = $(".rt-home-business-field__inner");
      var totalItem = $('.multi-cta-list').find("li").length;
      // console.log(totalItem);

      var wWin = $(window).width();
      if (wWin >= 576) {
        businessField.attr('data-total-items', totalItem);
        businessField.css('height', 'calc(80vh * ' + totalItem + ')');
        var scrollPosition = function (field, inner) {
          var totalItems = field.attr("data-total-items");
          var fieldHeight = field.outerHeight();
          var fieldOffsetTop = field.offset().top;
          var innerHeight = inner.outerHeight();
          var innerOffsetTop = inner.offset().top - (fieldOffsetTop + innerHeight) + innerHeight;
          var scrollPercentage = Math.round(innerOffsetTop / (fieldHeight - innerHeight) * 100);
          var itemPercentage = 100 / totalItems;
          var percentages = [];
          for (var i = 1; i <= totalItems; i++) {
            percentages.push(i * itemPercentage);
          }
          if (0 < scrollPercentage && scrollPercentage < 100) {
            return function (percentages, scrollPercentage) {
              for (var i = 0; i < percentages.length; i++) {
                if (scrollPercentage < percentages[i]) {
                  return i;
                }
              }
              return -1;
            }(percentages, scrollPercentage);
          }
        }(businessField, businessFieldInner);
        if ($.isNumeric(scrollPosition)) {
          var listItem = businessFieldInner.find(".multi-cta-list li").eq(scrollPosition);
          var bgColor = listItem.attr("data-bg-color");
          var colorText = listItem.attr("data-color");
          businessFieldInner.find(".multi-cta-list li").not(listItem).removeClass("is-active default-li");
          listItem.hasClass("is-active") || listItem.addClass("is-active default-li");
          if (businessField.attr("data-bg-color") !== bgColor) {
            businessField.attr("data-bg-color", bgColor);
            businessField.attr('style', '--bg-color:' + bgColor + '; --color:' + colorText);
            businessField.css('height', 'calc(80vh * ' + totalItem + ')');
          }
          var multiCtaWrapper = businessFieldInner.find(".multi-cta-wrapper");
          var listLength = multiCtaWrapper.find("li").length;
          var listItemHeight = multiCtaWrapper.outerHeight() / listLength / 2;
          var description = multiCtaWrapper.find("li.is-active").attr("data-description");
          var translateYValue = listItemHeight * scrollPosition;
          multiCtaWrapper.css("transform", "translateY(-" + translateYValue + "px)");
          businessField.find(".active-item-desc").empty().append(description || "");
        }
      } else {
        // $('.multi-cta-list').find("li").removeClass("is-active");
        businessField.removeAttr("style");
        businessField.find(".multi-cta-wrapper").removeAttr("style");
      }
    }
  }
  function handleImageTopBusinessField() {
    if ($('.wrap-content__title').length < 1) return;
    $('.multi-cta-list li').each(function () {
      var heightTitle = $(this).find('.wrap-content__title').outerHeight();
      $(this).attr('style', '--topImage:' + heightTitle + 'px');
    });
  }
  function handleLoadMoreMember() {
    $(document).on('click', '.load-more-team', function (e) {
      e.preventDefault();
      var element = $(this);
      var paged = $(this).attr('data-page');
      var total = $(this).attr('data-total');
      paged++;
      $.ajax({
        url: wp_vars.ajax_url,
        data: {
          paged: paged,
          action: "load_more_member"
        },
        type: 'POST',
        cache: false,
        beforeSend: function beforeSend(xhr) {
          element.addClass('is-loading');
        }
      }).done(function (res) {
        element.removeClass('is-loading');
        if (!res.success) {
          $.rt_noti('Load more member fail', 2000);
        } else {
          $('#category-all .rt-meet-the-team__list').append(res.data.member_html);
          $('.lazy').Lazy({
            afterLoad: function afterLoad(elm) {
              $(elm).css('visibility', 'visible');
            }
          });
          if (parseInt(paged) >= parseInt(total)) {
            element.closest('.rt-meet-the-team__cta').remove();
          }
        }
      }).fail(function (res) {});
    });
  }
  function initSliderBanner() {
    if ($('.isa-home-banner__slider').length < 1) return;
    var progressCircle = $(".isa-home-banner__pager .rt-progress.over");
    var progressContent = $(".isa-home-banner__pager span");
    var sliderBanner = new Swiper('.isa-home-banner__slider', {
      slidesPerView: 1,
      spaceBetween: 16,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      autoplay: {
        delay: 6500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.slider-pagination-banner',
        clickable: true,
        type: "bullets",
        bulletClass: "isa-bullet",
        bulletActiveClass: "is-active",
        renderBullet: function renderBullet(index, className) {
          var slide = this.slides[index];
          var pagerCategory = slide.dataset.pagerCategory;
          var pagerTitle = slide.dataset.pagerTitle;
          return '<div class="' + className + '"><div class="pager__item"><span><strong>' + pagerCategory + '</strong></span></div> </div>';
        }
      },
      on: {
        autoplayTimeLeft: function autoplayTimeLeft(s, time, progress) {
          // console.log(progress);
          // progressCircle.style.setProperty("--progress", 1 - progress);
          progressCircle.attr('style', '--progress:' + (1 - progress));
          progressContent.textContent = "".concat(Math.ceil(time / 1000), "s");
        }
      },
      navigation: {
        nextEl: '.tohs-prestigious-university__arrow .tohs-swiper-next',
        prevEl: '.tohs-prestigious-university__arrow .tohs-swiper-prev'
      }
    });
    var toggleButton = document.getElementById('toggleButtonPause');
    var pager = $('.isa-home-banner__pager');
    var video = $('.isa-home-banner__video video');
    var isPlaying = true;

    // Make sure the video plays inline instead of full screen
    video.attr('playsinline', '');
    video.attr('webkit-playsinline', '');
    toggleButton.addEventListener('click', function () {
      if (isPlaying) {
        pager.addClass('is-paused');
        sliderBanner.autoplay.pause();
        video.get(0).pause();
      } else {
        pager.removeClass('is-paused');
        sliderBanner.autoplay.resume();
        video.get(0).play();
      }
      isPlaying = !isPlaying;
    });
    handleMatchHeight();
  }
  function handleMatchHeight() {
    if ($('.isa-home-banner .isa-bullet .pager__item').length > 0) {
      $('.isa-home-banner .isa-bullet .pager__item').matchHeight();
    }
  }
  function initSliderVistLocation() {
    if ($('.isa-vist-location__list').length < 1) return;
    var swiper = new Swiper('.isa-vist-location__list', {
      speed: 400,
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      allowSlideNext: true,
      pagination: {
        el: ".isa-vist-location__pagination--bulet",
        clickable: true
      },
      navigation: {
        nextEl: '.isa-vist-location__arrow--next',
        prevEl: '.isa-vist-location__arrow--prev'
      },
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        // when window width is >= 768px
        576: {
          slidesPerView: 2
        }
      }
    });
  }
  var sliderInstances = {};
  function initPrestigiousUniversitySlider(elementTop, tabId) {
    if ($('.isa-prestigious-university__list').length < 1) return;

    // console.log(sliderInstances);

    if (sliderInstances[tabId]) {
      // Slider đã được khởi tạo, không khởi tạo lại
      return;
    }
    var sliderUniversity = new Swiper(elementTop, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
      lazy: true,
      speed: 500,
      pagination: {
        el: ".isa-prestigious-university__pagination--nav",
        type: "progressbar"
      },
      on: {
        init: function init() {
          updatePaginationCounter();
          handleMatchHeightTitle();
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          handleMatchHeightTitle();
          updatePaginationCounter();
        },
        resize: function resize() {
          handleMatchHeightTitle();
          calcWidthSlider();
        }
      },
      navigation: {
        nextEl: '.isa-prestigious-university .isa-swiper-next',
        prevEl: '.isa-prestigious-university .isa-swiper-prev'
      },
      breakpoints: {
        768: {
          spaceBetween: 32,
          slidesPerView: 1.5
        },
        992: {
          slidesPerView: 1.4,
          spaceBetween: 48
        },
        1600: {
          slidesPerView: 1.7,
          spaceBetween: 54
        }
      }
    });
    sliderInstances[tabId] = sliderUniversity;
    calcWidthSlider();
    updatePaginationCounter();
    handleMatchHeightTitle();
  }
  function updatePaginationCounter() {
    var currentTab = $('#UniversityTab').find('.nav-link.active').attr('id');
    var currentSwiper = document.getElementById(currentTab + '-content').querySelector('.swiper-container');
    var currentSlide = (currentSwiper.swiper.realIndex + 1).toString().padStart(2, '0');
    var totalSlides = currentSwiper.swiper.slides.length.toString().padStart(2, '0');
    $('.isa-prestigious-university__pagination--count').find(".current").text(currentSlide);
    $('.isa-prestigious-university__pagination--count').find(".total").text(totalSlides);
  }
  function handleMatchHeightTitle() {
    var maxHeight = 0;
    $('.isa-prestigious-university .content-top__title').css('height', 'auto');
    $('.isa-prestigious-university .content-top__title').each(function () {
      var height = $(this).outerHeight();
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    $('.isa-prestigious-university .content-top__title').css('height', maxHeight + 'px');
  }
  function handlePrestigiousUniversityTab() {
    $('.isa-prestigious-university__mobile li').click(function () {
      var position = $(this).position();
      var scroll = $('.isa-prestigious-university__mobile').scrollLeft();
      $('.isa-prestigious-university__mobile').animate({
        'scrollLeft': scroll + position.left - 30
      }, 200);
    });
    if ($('#UniversityTabContent .tab-pane.active').length > 0) {
      var elementTop = '#UniversityTabContent .tab-pane.active .isa-prestigious-university__list';
      var tabId = $('#UniversityTabContent .tab-pane.active').attr('id');
      initPrestigiousUniversitySlider(elementTop, tabId);
    }
    $('.isa-prestigious-university__nav button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
      var elementTop = '#UniversityTabContent .tab-pane.active .isa-prestigious-university__list';
      var tabId = $('#UniversityTabContent .tab-pane.active').attr('id');
      initPrestigiousUniversitySlider(elementTop, tabId);
      updatePaginationCounter();
    });
  }
  function calcWidthSlider() {
    var fullWidthSlider = $('#UniversityTabContent').outerWidth();
    var widthSlideCenter = $('.isa-prestigious-university__list .swiper-slide-active').outerWidth();
    var result = (fullWidthSlider - widthSlideCenter) / 2;
    widthSlideCenter = widthSlideCenter + 24;
    $('.isa-slider-prestigious-university-container').css('max-width', widthSlideCenter + 'px');
    $('.isa-prestigious-university__list').attr('style', '--positionArrow:' + result + 'px');
  }
  $(function () {
    handleUpload();
    initFeelingParentSlider();
    chartInit('doughnutChart');
    handleRichEditors();
    handleButtonViewImage();
    initTimeRegulationsSlider();
    handleIntro();
    handleClickTabWhyJoin();
    handleCardWhyUs();
    handleTabProgram();
    handlePromotion();

    // Slider Video hoặc hình
    handleBuildingGreatness();
    calculateBuildingGreatness();
    handleSliderBuildingGreatness();

    // Scroll chuyển hình với nội dung
    handleScrollBusinessField();
    handleImageTopBusinessField();
    handleLoadMoreMember();
    // Banner Video
    initSliderBanner();
    initSliderVistLocation();
    // Slider Tab Bootsrap
    handlePrestigiousUniversityTab();
    initPrestigiousUniversitySlider();
    handleMatchHeightTitle();
    $(window).resize(function () {
      handleCardWhyUs();
    });
    handleCounterNumber();
    $(window).on('scroll', function () {
      handleCounterNumber();
      // Scroll chuyển hình với nội dung
      handleScrollBusinessField();
      handleImageTopBusinessField();
    });
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
        // console.log('Không tìm thấy phần tử togglePassword.');
      }
    });
  };
  var facebookLogin = function facebookLogin(id, config) {
    window.fbAsyncInit = function () {
      FB.init(config);
      FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    document.addEventListener('click', function (e) {
      var element = document.getElementById(id);
      if (element.contains(e.target)) {
        e.preventDefault();
        FB.login(function () {
          FB.getLoginStatus(function (response) {
            if ('connected' === response.status) {
              FB.api('/me', {
                fields: 'id,first_name,last_name,email,gender,picture'
              }, function (profile) {
                handleLogin({
                  id: profile.id,
                  login: profile.email,
                  email: profile.email,
                  last_name: profile.last_name,
                  first_name: profile.first_name,
                  avatar: profile.picture.data.url
                });
                FB.logout(response);
              });
            }
          });
        }, {
          scope: 'email'
        });
      }
    });
  };
  var googleLoginCallback = function googleLoginCallback(response) {
    $('.bm-google-btn').addClass('is-loading');
    var profile = decodeJwtResponse(response.credential);
    console.log(profile);
    var provide_id = profile.jti || '';
    var first_name = profile.family_name || '';
    var last_name = profile.given_name || '';
    var name = profile.name || '';
    var email = profile.email || '';
    var picture = profile.picture || '';
    if (provide_id === "" || email === "") {
      alert('Không thể lấy được thông tin người dùng.');
      return false;
    }

    // Gửi dữ liệu lên server để xác thực và đăng nhập
    jQuery.ajax({
      url: 'login-google.php',
      type: 'POST',
      data: {
        "type": "google",
        "id": provide_id,
        "first_name": first_name,
        "last_name": last_name,
        "display_name": name,
        "email": email,
        "picture": picture
      },
      success: function success(response) {
        var res = JSON.parse(response);
        if (res.success) {
          if (res.role == "admin") {
            window.location.href = "bm-admin";
          } else {
            window.location.href = "trang-chu";
          }
        } else {
          alert(res.message);
        }
      },
      error: function error() {
        alert('Đã xảy ra lỗi trong quá trình đăng nhập bằng Google.');
      }
    });
  };
  if (window.google && window.google.accounts) {
    window.google.accounts.id.initialize({
      client_id: '539559261576-2qhoqucptfova61pk3tomuclh74e9abp.apps.googleusercontent.com',
      ux_mode: "popup",
      callback: googleLoginCallback
    });

    // Tạo một nút ẩn (nếu cần) để kích hoạt đăng nhập
    var createFakeGoogleWrapper = function createFakeGoogleWrapper() {
      var googleLoginWrapper = document.createElement("div");
      googleLoginWrapper.style.display = "none";
      googleLoginWrapper.classList.add("custom-google-button");
      document.body.appendChild(googleLoginWrapper);
      window.google.accounts.id.renderButton(googleLoginWrapper, {
        theme: 'outline',
        size: 'large'
      });
      var googleLoginWrapperButton = googleLoginWrapper.querySelector("div[role=button]");
      return {
        click: function click() {
          googleLoginWrapperButton.click();
        }
      };
    };

    // Thực hiện lệnh click bằng cách tạo sự kiện trên iPhone
    var googleButtonWrapper = createFakeGoogleWrapper();
    document.getElementById("bm-google-btn").addEventListener("click", function () {
      googleButtonWrapper.click(); // Kích hoạt đăng nhập Google
    });
  }
  function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(jsonPayload);
  }
  $(function () {
    showPassword();
    // facebookLogin('fbLogin', {
    //     xfbml: true,
    //     cookie: true,
    //     appId: "1073491914479527",
    //     version: "v21.0"
    // });

    $(window).on("resize", function () {});
  });
})(jQuery);
(function ($) {
  function handleInputEmail() {
    BMplaceholderTypewriter('#email-password-change', {
      delay: 50,
      pause: 1000,
      text: ["Nhập Email của bạn ..", "Mã OTP sẽ được gửi về Email .."]
    });
    BMplaceholderTypewriter('#otp', {
      delay: 50,
      pause: 1000,
      text: ["Nhập OTP của bạn .."]
    });
  }
  $(function () {
    handleInputEmail();
    $(window).on("resize", function () {});
  });
})(jQuery);
(function ($) {
  var handleUploadAvatar = function handleUploadAvatar(id, options) {
    var form = document.getElementById(id);
    if (form) {
      Dropzone.autoDiscover = false;
      new Dropzone('#' + id, {
        url: 'upload_avatar.php',
        // Đảm bảo đường dẫn chính xác đến file PHP xử lý upload
        method: "post",
        // Phương thức gửi dữ liệu
        paramName: "file",
        // Tên mặc định cho Dropzone để gửi file
        thumbnailWidth: options.thumbnailWidth,
        thumbnailHeight: options.thumbnailHeight,
        maxFilesize: 5,
        // MB
        acceptedFiles: 'image/*',
        dictFileTooBig: "Tệp quá lớn ({{filesize}}MB). Tối đa cho phép: {{maxFilesize}}MB.",
        dictInvalidFileType: "Bạn không thể tải lên các tập tin loại này.",
        success: function success(file, response) {
          toast({
            type: "success",
            position: "top-right",
            title: "Cập nhập ảnh Avatar thành công",
            redirect: 'upload_avatar.php'
          });
        },
        error: function error(file, message) {
          toast({
            type: "error",
            position: "top-right",
            title: message
          });
          form.classList.remove('dz-started');
          $(form).find('.dz-preview').remove();
          return false;
        }
      });
    }
  };
  $(function () {
    handleUploadAvatar('upload-avatar-user', {
      thumbnailWidth: 120,
      thumbnailHeight: 120
    });
    $(window).on("resize", function () {});
  });
})(jQuery);