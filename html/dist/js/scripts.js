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
    showCloseButton = _ref$showCloseButton === void 0 ? false : _ref$showCloseButton;
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
    _ref2$customStyles = _ref2.customStyles,
    customStyles = _ref2$customStyles === void 0 ? {
      customSelectBorder: 'rgba(32, 92, 212, 0.2)',
      customSelectColor: '#000000',
      customSelectColorHover: '#000000',
      customSelectBackground: 'white',
      customSelectBackgroudHover: '#f2f6ff'
    } : _ref2$customStyles,
    _ref2$styleColor = _ref2.styleColor,
    styleColor = _ref2$styleColor === void 0 ? false : _ref2$styleColor;
  var selected = selectElement.value;
  var containerOption, optionsList;

  // Hide the default select box
  selectElement.style.display = 'none';
  var customSelectBorder = customStyles.customSelectBorder,
    customSelectColor = customStyles.customSelectColor,
    customSelectColorHover = customStyles.customSelectColorHover,
    customSelectBackground = customStyles.customSelectBackground,
    customSelectBackgroudHover = customStyles.customSelectBackgroudHover;

  // Apply custom styles
  customSelect.querySelector('.select-style').setAttribute('style', '--customSelectBorder:' + customSelectBorder + '; --customSelectColor:' + customSelectColor + '; --customSelectColorHover:' + customSelectColorHover + '; --customSelectBackground:' + customSelectBackground + '; --customSelectBackgroudHover:' + customSelectBackgroudHover);
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
      var offsetLeft = customSelect.offsetLeft; // Lấy vị trí left so với container
      var container = document.querySelector('.container');
      var containerRect = container.getBoundingClientRect();
      var correctedLeft = customSelectRect.left - containerRect.left;
      console.log(customSelectRect.left);
      console.log(containerRect.left);
      console.log(correctedLeft);
      if (containerHeight > windowHeight) {
        adjustedLeft = customSelectRect.left + scrollbarWidth;
      } else {
        adjustedLeft = customSelectRect.left;
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

      // Thay vì dùng customSelectRect.top, tính toán chính xác vị trí so với tài liệu
      var topCustomSelect = customSelectRect.top + window.scrollY;
      if (windowHeight - (customSelectRect.top - window.scrollY) < optionsHeight) {
        console.log('quay lên');
        containerOption.style.top = topCustomSelect - optionsHeight - spacing + "px";
        containerOption.style.left = customSelectRect.left + "px";
        containerOption.style.width = customSelect.offsetWidth + "px";
      } else {
        console.log('quay xuống');
        containerOption.style.top = topCustomSelect + customSelectHeight + spacing + "px";
        containerOption.style.left = customSelectRect.left + correctedLeft + "px";
        containerOption.style.width = customSelect.offsetWidth + "px";
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
  // document.addEventListener('click', function (event) {
  //     if (!customSelect.contains(event.target) && containerOption.offsetWidth > 0 && containerOption.offsetHeight > 0) {
  //         // Nếu không click vào customSelect hoặc containerOption, đóng danh sách
  //         customSelect.querySelector('.select-style').classList.remove('show');
  //         containerOption.remove();
  //     }
  // });

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

// function handleSelectBox(selectors, selectStatus = true) {
//     if (selectors) {
//         document.querySelectorAll(selectors).forEach(function (element) {
//             initializeCustomSelect({
//                 selectElement: element,
//                 customSelect: element.closest('.custom-select'),
//                 showSearch: true
//             });
//         });
//     }
//     if (selectStatus) {
//         document.querySelectorAll('.select-status-table').forEach(function (element) {
//             initializeCustomSelect({
//                 selectElement: element,
//                 customSelect: element.closest('.select-status-edit')
//             });
//         });
//     }

// }

// handleSelectBox('.select-time, .select-status');
initializeCustomSelect({
  selectElement: document.querySelector('.select-time'),
  customSelect: document.querySelector('.select-filter-time'),
  showSearch: true
});
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
(function ($) {
  $(function () {});
})(jQuery);