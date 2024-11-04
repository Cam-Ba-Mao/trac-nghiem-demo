"use strict";

function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function ($) {
  function enableAllTooltips() {
    var tooltipelements = document.querySelectorAll("[data-bs-toggle='tooltip']");
    tooltipelements.forEach(function (el) {
      new bootstrap.Tooltip(el);
    });
  }
  var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  var tooltipList = _toConsumableArray(tooltipTriggerList).map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  $('.bm-admin-sidebar >ul >li:not(.line)').hover(function () {
    if (!$('.sub-menu:visible', this).length) {
      $('.dropdown-menu', this).show();
      $(this).addClass('hover');
    }
  }, function () {
    $('.dropdown-menu', this).hide();
    $(this).removeClass('hover');
  });
  $('[dropdown] >li').hover(function () {
    $('ul', this).show();
    $(this).addClass('active');
    console.log('aaaaaaaaaa');
  }, function () {
    $('ul', this).hide();
    $(this).removeClass('active');
  });
  $('.bm-admin-sidebar >ul >li').each(function () {
    if ($('.sub-menu', this).length) {
      var html = $('.sub-menu', this).html();
      $(this).append('<ul dropdown class="dropdown-menu">' + html + '</ul>');
    }
  });
  $('.bm-collapse-admin-menu').on('click', function (e) {
    $('body').toggleClass('sidebar-collapse');
    $('.bm-admin-sidebar').toggleClass('fix');
    if ($('.fa-solid', this).hasClass('fa-arrow-circle-left')) {
      $('.bm-admin-sidebar >ul >li.active .sub-menu').hide();
      $('.fa-solid', this).removeClass('fa-arrow-circle-left').addClass('fa-arrow-circle-right');
      localStorage.setItem('sidebar', true);
    } else {
      $('.fa-solid', this).removeClass('fa-arrow-circle-right').addClass('fa-arrow-circle-left');
      $('.bm-admin-sidebar >ul >li.active .sub-menu').show();
      delete localStorage['sidebar'];
    }
    e.preventDefault();
  });
  $('.bm-collapse-menu-mobile').on('click', function (e) {
    $('body').toggleClass('sidebar-collapse');
    $('.bm-admin-sidebar').toggleClass('fix');
    if ($('.bm-admin-sidebar').hasClass('fix')) {
      $('.bm-admin-sidebar >ul >li.active .sub-menu').hide();
      localStorage.setItem('sidebar', true);
    } else {
      $('.bm-admin-sidebar >ul >li.active .sub-menu').show();
      delete localStorage['sidebar'];
    }
    e.preventDefault();
  });
  function sidebarCheck() {
    if (localStorage.getItem('sidebar')) {
      $('.bm-admin-sidebar .bm-collapse-admin-menu').trigger('click');
    }
  }
  sidebarCheck();
  enableAllTooltips();
  $(function () {
    // handleRichEditors({
    //     'mytextarea-1': {
    //         height: 500,
    //         toolbar: 'undo redo | bold italic | link image',
    //         plugins: 'link image'
    //     },

    // });

    $(window).on("resize", function () {});
  });
})(jQuery);
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
handleRichEditors();
var POST = {
  htmlEntities: function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },
  permalink: function permalink(slug) {
    var url,
      EXT = '';
    slug = slug.replace(ROOT, '');
    slug = POST.slugStr(slug);
    url = ROOT + slug + EXT;
    return url;
  },
  slugStr: function slugStr(str) {
    var slug;
    slug = str.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  },
  slugEdit: function slugEdit() {
    $(document).on('click', '.edit-slug', function (e) {
      $(this).text('Ok');
      $(this).attr('class', 'save button');
      var box = $('#edit-slug-box');
      var input = box.find('input');
      input.focus();
      var val = input.val();
      box.attr('data-slug', val);

      // edit-slug-buttons
      box.find('#edit-slug-buttons').append('<button>');
      box.find('button:last').text('Hủy');
      box.find('button:last').attr('type', 'button');
      box.find('button:last').attr('class', 'cancel button');

      // editable-post-name
      box.find('#editable-post-name').html(input);

      // sample-permalink
      var prefix = box.find('#sample-permalink').text().trim();
      box.find('#sample-permalink').html($('#editable-post-name'));
      box.find('#sample-permalink').prepend(prefix);
      box.find('input').attr('type', 'text');
      box.find('input').focus();
    });
  },
  slugSave: function slugSave() {
    $(document).on('click', '.save', function (e) {
      var box = $('#edit-slug-box');
      var input = box.find('input');
      var new_slug = input.val();
      var old_slug = box.data('slug');
      var slug = new_slug ? new_slug : old_slug;
      slug = POST.slugStr(slug);
      var href = $('#sample-permalink')[0].innerText + slug + '/';

      //sample-permalink
      box.attr('data-edited', 1);
      box.find('#sample-permalink').wrapInner('<a>');
      box.find('a').attr({
        href: href,
        target: '_blank'
      });
      box.find('#sample-permalink').append(input);
      box.find('input').val(slug);
      box.find('input').attr('type', 'hidden');
      box.find('.save').text('Chỉnh sửa');
      box.find('.save').attr('class', 'edit-slug button');
      //editable-post-name
      box.find('#editable-post-name').text(slug);
      box.find('.cancel').remove();
      box.removeAttr('data-slug');
      $(this).text('Chỉnh sửa');
      $(this).attr('class', 'edit-slug button');
    });
    //check keyup keypress ENTER
    $(document).on('keyup keypress', '.post-slug', function (e) {
      var keyCode = e.keyCode || e.which;
      var box = $('#edit-slug-box');
      switch (keyCode) {
        case 13:
          box.find('.save').click();
          e.preventDefault();
          return false;
          break;
        case 27:
          box.find('.cancel').click();
          e.preventDefault();
          return false;
          break;
      }
    });
  },
  slugCancel: function slugCancel() {
    $(document).on('click', '.cancel', function (e) {
      $(this).remove();
      var box = $('#edit-slug-box');
      var input = box.find('input');
      var slug = box.data('slug');
      box.removeAttr('data-slug');
      box.find('.save').text('Chỉnh sửa');
      box.find('.save').attr('class', 'edit-slug button');
      var href = $('#sample-permalink')[0].innerText + slug + '/';

      //sample-permalink
      box.find('#sample-permalink').wrapInner('<a>');
      box.find('a').attr({
        href: href,
        target: '_blank'
      });
      box.find('#sample-permalink').append(input);
      box.find('input').val(slug);
      box.find('input').attr('type', 'hidden');

      //editable-post-name
      box.find('#editable-post-name').text(slug);
    });
  },
  slugAdd: function slugAdd() {
    if (typeof sub !== 'undefined' && sub != 'edit') {
      $(document).on('keyup', '#title', function () {
        var val = $(this).val();
        var slug = POST.slugStr(val);
        var box = $('#edit-slug-box');
        if (1 == box.data('edited')) {
          return;
        }
        var href = $('#sample-permalink')[0].innerText + slug + '/';
        if (val) {
          box.removeAttr('style');
        } else {
          box.css('z-index', -1);
        }
        if (box.find('.save').length > 0) {
          box.find('.save').click();
        }
        box.find('input').val(slug);
        box.find('a').attr('href', href);
        box.find('#editable-post-name').text(slug);
      });
    }
  },
  init: function init(module) {
    core.init(module, function () {
      POST.slugAdd();
      POST.slugEdit();
      POST.slugSave();
      POST.slugCancel();

      // core.formEditor('textarea34', {
      // 	language : 'en',
      // })

      core.formEditor('editor-description', {
        allowedContent: true,
        autoParagraph: false,
        height: 200,
        toolbar: 'Normal',
        language: 'vi',
        toolbarGroups: [{
          name: 'paragraph',
          groups: ['basicstyles', 'list', 'align', 'links', 'colors']
        }],
        removeButtons: 'Save,NewPage,Preview,Print,Cut,Copy,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Outdent,Indent,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,About,Subscript,Superscript,HorizontalRule,PageBreak,Strike,RemoveFormat,Anchor,Paste,PasteFromWord,CreateDiv,ShowBlocks,Youtube,NumberedList'
      });
      var elmTextarea = document.querySelectorAll('textarea[data-editor="true"]');
      // let editorEnabled = elmTextarea.dataset.editor;
      // console.log(editorEnabled);
      elmTextarea.forEach(function (item) {
        core.formEditor(item.id, {
          language: 'en'
        });
      });
    });
  }
};

// removeMetabox
function removeMetabox() {
  $(".metabox").each(function (i, e) {
    if ($.trim($(e).find(".inside").text()).length == '') {
      $(e).remove();
    }
  });
}

// changeUpload
function changeUpload(field_id) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "picture";
  var _parent, _pic_wrap;
  var obj = $(field_id);
  _parent = obj.parent();
  _parent.find('.picture-wrap').remove();
  _parent.prepend('<div class="picture-wrap">');
  _pic_wrap = _parent.find('.picture-wrap');
  _pic_wrap.css({
    marginBottom: 10
  });
  switch (type) {
    case "video":
      _pic_wrap.append('<div class="embed-video embed-responsive embed-responsive-16by9"><video controls="controls" preload="metadata"></video>');
      src = obj.val();
      _pic_wrap.find('video').attr('src', src);
      new_src = src.replace(UPLOAD_URL, '');
      obj.val(new_src);
      break;
    default:
      _pic_wrap.append('<img>');
      src = obj.val();
      _pic_wrap.find('img').attr('src', src);
      new_src = src.replace(UPLOAD_URL, '');
      obj.val(new_src);
      break;
  }
  _parent.find('.set-thumbnail').addClass('hide');
  _parent.find('.remove-thumbnail').removeClass('hide');
}

// number_format
function number_format(number, decimals, dec_point, thousands_sep) {
  number = number.replaceAll('.', ',');
  number = number.split(',').join('');
  var n = number,
    c = isNaN(decimals = Math.abs(decimals)) ? 0 : decimals;
  var d = dec_point == undefined ? "." : dec_point;
  var t = thousands_sep == undefined ? "," : thousands_sep,
    s = n < 0 ? "-" : "";
  var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

// do_delete
function do_delete(id) {
  var notice;
  notice = "Bạn có chắc chắn xóa ID: " + id;
  notice += '\n\n"Hủy bỏ" để dừng lại. "OK" để tiếp tục?';
  var ok = confirm(notice);
  return ok ? true : false;
}

// is_num
function is_num(event, f) {
  if (event.srcElement) {
    kc = event.keyCode;
  } else {
    kc = event.which;
  }
  if ((kc < 47 || kc > 57) && kc != 8 && kc != 0) return false;
  return true;
}

// do_check
function do_check(id) {
  $('#row_' + id).find('.checkbox').prop("checked", true);
  $('#row_' + id).addClass("checked");
  $('#row_' + id).addClass("checked");
  allCheck($('#row_' + id));
}

// do_submit
var do_submit = function do_submit(action) {
  var mess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  document.manage.action.value = action;
  if (selected_item()) {
    if (action == "delete" || action == "del") {
      if (!mess) {
        mess = "Bạn có chắc chắn xóa dữ liệu?";
        mess += '\n\n"Hủy bỏ" để dừng lại. "OK" để tiếp tục?';
      }
      _confirm = confirm(mess);
      if (!_confirm) return false;
    }
    document.manage.submit(function (e) {
      e.preventDefault();
    });
  }
};

// selected_item
var selected_item = function selected_item() {
  var ok = 0;
  $("table.table-list tbody input.checkbox").each(function () {
    var c = this.checked;
    if (c) {
      ok = 1;
    }
  });
  if (ok) {
    return true;
  } else {
    alert('Hãy chọn ít nhất 1 record.');
    return false;
  }
};

// checkAll
var checkAll = function checkAll() {
  $('input[name=checkall]').on("change", function (e) {
    event.preventDefault();
    var self = this,
      table = self.closest('table');
    if (this.checked) {
      $(table).find("input[name=checkall]").prop("checked", true);
      $(table).find('input.checkbox').each(function () {
        $(this).prop('checked', true);
        $(this).parents("tr").addClass("checked");
      });
    } else {
      $(table).find("input[name=checkall]").prop("checked", false);
      $(table).find('input.checkbox').each(function () {
        $(this).prop('checked', false);
        $(this).parents("tr").removeClass("checked");
      });
    }
    return false;
  });
};

// chkClick
function chkClick() {
  $("input.checkbox").on("click", function () {
    if ($(this).is(':checked')) {
      $(this).parents("tr").addClass("checked");
    } else {
      $(this).parents("tr").removeClass("checked");
    }
    allCheck($(this));
  });
}

// allCheck
function allCheck(obj) {
  parents = obj.parents('.table-list');
  length = parents.find('tbody input[type=checkbox]').length;
  if (parents.find('tbody input:checked').length == length) {
    parents.find('input[name=checkall]').prop('checked', true);
  } else {
    parents.find('input[name=checkall]').prop('checked', false);
  }
}

// setFocus
function setFocus(id, bool) {
  $.ajax({
    async: true,
    type: "POST",
    url: window.location.href + '/ajax',
    dataType: 'json',
    data: {
      id: id,
      bool: bool
    },
    success: function success(data) {
      //$('#message').remove();
      //$('form[name=manage]').prepend(data);
    }
  });
}

// tagAdd
function tagAdd(act) {
  $(document).on("click", ".tagadd", function () {
    var ok = 1;
    var input_tag = $("input[name=post_tag]");
    var post_tag = input_tag.val();
    if (post_tag == "") {
      ok = 0;
      input_tag.focus();
    }
    if (ok) {
      $.ajax({
        async: true,
        type: "POST",
        url: ajaxUrl + act,
        dataType: 'json',
        data: {
          lang: lang,
          post_tag: post_tag,
          module: module
        },
        success: function success(data) {
          var c = $(".tagchecklist");
          c.append(data);
          input_tag.val('');
          input_tag.focus();
        }
      });
    }
  });
}

// tagDel
function tagDel() {
  $(document).on("click", ".tagchecklist>span", function () {
    $(this).remove();
  });
}

// changeImgSvg
function changeImgSvg() {
  $('body').find('img.svg').each(function () {
    $(this).hide();
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');
      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
}

// function colorpicker(input)
// {
// 	if(cnTMXH.elmCheck(input)>0)
// 	{
// 		$(input).css('color', '#FFFFFF');
// 		$(input).css('background', '#' + $(input).val());
// 		$(input).ColorPicker({
// 			onSubmit: function(hsb, hex, rgb, el) {
// 				$(el).val(hex);
// 				$(el).ColorPickerHide();
// 			},
// 			onBeforeShow: function () {
// 				$(this).ColorPickerSetColor(this.value);
// 			},
// 			onChange: function (hsb, hex, rgb) {
// 				$(input).val(hex);
// 				$(input).css('background', '#' + hex);
// 			}
// 		})
// 		.bind('keyup', function(){
// 			$(this).ColorPickerSetColor(this.value);
// 			$(input).val(this.value);
// 			$(input).css('background', '#' + this.value);
// 		});
// 	}
// }

//==========
$(function () {
  // colorpicker('#color');

  // Upload button fancybox
  // if($('body, html').find('.btn-upload').length)
  // {
  // 	$('.btn-upload').fancybox({
  // 		padding : 0,
  // 		type: 'iframe',
  //         autoSize: false,
  // 		fitToView: false,
  // 		autoScale: false,
  //         autoDimensions: false,
  // 		width: $(window).width() - 80,
  // 		height: $(window).height() - 80,
  // 	});
  // }

  // Remove thumbnail click
  $(document).on('click', '.remove-thumbnail', function () {
    var _parent = $(this).parent();
    $(this).addClass('hide');
    _parent.find('input').val('');
    _parent.find('div:first').remove();
    _parent.find('.set-thumbnail').removeClass('hide');
    return false;
  });

  // sticky published box
  // $("#post-right-content").each(function(){
  // 	$(this).wrapInner("<div class=sticky>");
  // 	$(this).find(".sticky").sticky({
  // 		topSpacing: 60,
  // 		bottomSpacing: 90,
  // 	});
  // });

  // collapse menu
  // var collapse;
  // $('*[data-toggle="offcanvas"]').on('click', function(){
  // 	if(document.body.classList.contains('sidebar-collapse')) {
  // 		collapse = 0;
  // 	}
  // 	else {
  // 		collapse = 1;
  // 	}
  // 	$.ajax({
  // 		type: 'POST',
  // 		dataType: 'json',
  // 		url: '?act=admin_ajax&do=collapse',
  // 		data: {collapse: collapse},
  // 		success: function(){
  // 			APP.scrollMenu($(".main-header").height());
  // 		}
  // 	});
  // });

  $(document).on('click', '.picture-wrap', function () {
    var btn = $(this).parent().find('.btn-upload');
    btn.click();
  });
  tagDel();
  tagAdd('addtag');
  checkAll();
  chkClick();
  changeImgSvg();
  // cnTMXH.autoLoad();

  //edit slug post
  POST.init();

  // scrollMenu
  // APP.scrollMenu(40);

  // message close
  $(document).on('click', 'button.notice-dismiss', function () {
    $(this.parentNode).fadeOut(400, function () {
      this.remove();
    });
  });
  $(document).on("click", ".metabox > .handlediv", function () {
    var self = this,
      node = self.parentNode;
    if (node.classList.contains("open")) {
      self.classList.add("down");
      self.classList.remove("up");
      node.classList.remove("open");
      $(node).find(".inside").show();
    } else {
      self.classList.add("up");
      node.classList.add("open");
      self.classList.remove("down");
      $(node).find(".inside").hide();
    }
  });
});
var APP = {
  scrollMenu: function scrollMenu(h) {
    var h = $(window).height() - h;
    // slimScroll menu
    if ($('html').find('.sidebar-collapse').length) {
      $('.scroll-menu').removeAttr('style');
      $('.main-sidebar').removeClass('slimScroll');
      $('div.scroll-menu').slimScroll({
        destroy: true
      });
    } else {
      if ($('html').find('.scroll-menu').length) {
        $('.main-sidebar').addClass('slimScroll');
        $('div.scroll-menu').slimScroll({
          size: 8,
          height: h,
          color: '#bbb',
          alwaysVisible: true
        });
      }
    }
  }
};

// $(window).resize(function(){
// 	APP.scrollMenu(40);
// });

var ws = {
  dropdown: function dropdown(sel) {
    var width = sel.offsetWidth;
    width = width > 85 ? 'auto' : 'auto';
    if (sel.length < 10) {
      $(sel).select2({
        width: width,
        dropdownAutoWidth: true,
        minimumResultsForSearch: Infinity
      });
      // console.log(width);
    } else {
      $(sel).select2({
        width: width,
        dropdownAutoWidth: true
      });
    }
  },
  autoResize: function autoResize(e) {
    e.style.height = "auto";
    e.style.overflow = "hidden";
    e.style.height = e.scrollHeight + 2 + "px";
  },
  bulkActions: function bulkActions() {
    var doactionTopId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "doaction";
    var doactionBottomId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "doaction2";
    return function (doactionTopId, doactionBottomId) {
      var doactionTopId = document.getElementById(doactionTopId);
      var doactionBottomId = document.getElementById(doactionBottomId);
      var form = doactionTopId.form;
      $(doactionTopId).on("change", function () {
        this.form.action.value = this.value;
        $(doactionBottomId).select2("destroy");
        $(doactionBottomId).val(this.value);
        ws.dropdown(doactionBottomId);
      });
      $(doactionBottomId).on("change", function () {
        this.form.action.value = this.value;
        $(doactionTopId).select2("destroy");
        $(doactionTopId).val(this.value);
        ws.dropdown(doactionTopId);
      });
      $(form).find(".bulkactions input[type=submit]").on("click", function (e) {
        var action = form.action.value;
        if (action) {
          e.preventDefault();
          $(form).submit();
        }
        form.action.value = "search";
      });
    }(doactionTopId, doactionBottomId);
  },
  init: function init() {
    $("#doaction").each(function () {
      ws.bulkActions("doaction", "doaction2");
    });
    $("select").each(function () {
      ws.dropdown(this);
    });
    $("textarea").each(function () {
      ws.autoResize(this);
    });
    $(document).on("keyup", "textarea", function () {
      ws.autoResize(this);
    });
    $(document).on("click", "a.preview-link", function () {
      var tr = this.closest("tr.row_item"),
        rowid = tr.id.substr(4);
      do_check(rowid);
    });
    // setInterval(function(){
    // 	$.ajax({
    // 		type: 'POST',
    // 		url: "?act=admin_ajax&do=notice",
    // 		dataType: 'json',
    // 		data: {
    // 			lang: lang
    // 		},
    // 		success: function(response) {
    // 			var app = document.getElementById("app");
    // 			if(response.num) {
    // 				if(! app.dataset.title) {
    // 					$(app).attr("data-title", document.title);
    // 				}
    // 				document.title = response.notice;
    // 				$.each(response.hooks, function(index, obj){
    // 					var hook = obj.hook,
    // 						notice = obj.notice,
    // 						node = document.getElementById("menu-"+hook);
    // 					if($(node).find("small").length == 0) {
    // 						$(node).find("a:first").append(notice);
    // 					}
    // 					else {
    // 						$(node).find("small").replaceWith(notice);
    // 					}
    // 				});
    // 			}
    // 			else {
    // 				if(app.dataset.title) {
    // 					document.title = app.dataset.title;
    // 					$(app).removeAttr("data-title");
    // 				}
    // 				$.each(response.hooks, function(index, obj){
    // 					var hook = obj.hook,
    // 						node = document.getElementById("menu-"+hook);
    // 					if($(node).find("small").length) {
    // 						$(node).find("small").remove();
    // 					}
    // 				});
    // 			}
    // 		}
    // 	});
    // }, 5000);
  }
};
$(function () {
  ws.init();
});
var core = {
  dd: function dd(params, isClear) {
    if (isClear === true) {
      console.clear();
    }
    console.log(params);
  },
  ul: function ul(obj, extra, cb) {
    var ul;
    ul = core.element('ul', extra);
    $.each(obj, function (idx, val) {
      core.element('li', {
        content: val
      }, function (li) {
        ul.appendChild(li);
      });
    });
    return core.handle(cb, ul);
  },
  handle: function handle(cb, args) {
    if (cb && typeof cb === 'function') {
      cb(args);
    }
    return args;
  },
  request: function request(key, val) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === key) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
    return val;
  },
  anchor: function anchor(link, text, extra, cb) {
    if (!extra || _typeof(extra) != 'object') {
      extra = {};
    }
    var el;
    extra.href = link;
    extra.content = text;
    el = core.element('a', extra);
    return core.handle(cb, el);
  },
  element: function element(tag, options, cb) {
    node = document.createElement(tag);
    if (options && typeof options === 'string') {
      node.innerHTML = options;
    }
    if (options && typeof options.content != 'undefined') {
      node.innerHTML = options.content;
      delete options.content;
    }
    if (options && _typeof(options) === 'object') {
      $.each(options, function (name, value) {
        node.setAttribute(name, value);
      });
    }
    node = core.handle(options, node);
    node = core.handle(cb, node);
    return node;
  },
  mailto: function mailto(email, text, cb) {
    var fname, mailto;
    fname = arguments.callee.name;
    text = core.strEmpty(text, email);
    email = fname + ':' + email;
    mailto = core.anchor(email, text);
    return core.handle(cb, mailto);
  },
  isNum: function isNum(e) {
    if (e.srcElement) {
      kc = e.keyCode;
    } else {
      kc = e.which;
    }
    if ((kc < 47 || kc > 57) && kc != 8 && kc != 0) return false;
    return true;
  },
  toArray: function toArray(obj) {
    var arr = [];
    $.each(obj, function (key, val) {
      arr[key] = val;
    });
    return arr;
  },
  toObject: function toObject(arr) {
    return Object.assign({}, arr);
  },
  strPad: function strPad(str, len, pad) {
    str = str.toString();
    return str.length < len ? core.strPad(pad + str, len) : str;
  },
  strSlug: function strSlug(str) {
    var slug;
    slug = str.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  },
  strEmpty: function strEmpty(str, val) {
    return str ? str : val;
  },
  strExcerpt: function strExcerpt(str, len, more) {
    if (!Number(len)) return str;
    var cut = str.indexOf(' ', len);
    if (cut == -1) return str;
    str = str.substring(0, cut);
    str += core.strEmpty(more, '...');
    return str;
  },
  strReplace: function strReplace(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  },
  strNumber: function strNumber(str) {
    var opts = {
        minimumFractionDigits: 0
      },
      n = str.toLocaleString(undefined, opts);
    return n;
  },
  addNode: function addNode(tag, options, cb) {
    return core.element(tag, options, cb);
  },
  metaTag: function metaTag(_ref, cb) {
    var name = _ref.name,
      content = _ref.content,
      args = _ref.args;
    if (!args) {
      args = {
        name: name
      };
    } else {
      args = Object.assign({
        name: name
      }, args);
    }
    var el,
      d = document,
      t = 'meta';
    el = core.element(t, args);
    el.content = content;
    metas = d.getElementsByTagName(t);
    metas[metas.length - 1].after(el);
    return core.handle(cb, el);
  },
  linkTag: function linkTag(_ref2, cb) {
    var src = _ref2.src,
      args = _ref2.args;
    if (!args) {
      args = {
        href: src,
        rel: 'stylesheet',
        type: 'text/css'
      };
    } else {
      args = Object.assign({
        href: src
      }, args);
    }
    var el,
      d = document,
      t = 'link';
    el = core.element(t, args);
    links = d.getElementsByTagName(t);
    links[links.length - 1].after(el);
    return core.handle(cb, el);
  },
  scriptTag: function scriptTag(_ref3, cb) {
    var src = _ref3.src,
      args = _ref3.args;
    if (!args) {
      args = {
        src: src,
        language: 'javascript',
        type: 'text/javascript'
      };
    } else {
      args = Object.assign({
        src: src
      }, args);
    }
    var el,
      d = document,
      t = 'script';
    el = core.element(t, args);
    el.async = true;
    links = d.getElementsByTagName(t);
    links[links.length - 1].after(el);
    return core.handle(cb, el);
  },
  callAjax: function callAjax(_ref4, cb) {
    var url = _ref4.url,
      data = _ref4.data,
      beforeSend = _ref4.beforeSend;
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data,
      beforeSend: beforeSend,
      success: function success(response) {
        cb(response);
      }
    });
  },
  loadAjax: function loadAjax(_ref5, cb) {
    var module = _ref5.module,
      action = _ref5.action,
      data = _ref5.data,
      beforeSend = _ref5.beforeSend;
    core.callAjax({
      url: root + module + '/ajax/' + action,
      data: data,
      beforeSend: beforeSend
    }, function (response) {
      cb(response);
    });
  },
  modAjax: function modAjax(doaction, _ref6, cb) {
    var data = _ref6.data,
      beforeSend = _ref6.beforeSend;
    core.callAjax({
      url: ajaxUrl + doaction,
      data: data,
      beforeSend: beforeSend
    }, function (response) {
      cb(response);
    });
  },
  uniqueid: function uniqueid() {
    var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
    do {
      var ascicode = Math.floor(Math.random() * 42 + 48);
      if (ascicode < 58 || ascicode > 64) {
        idstr += String.fromCharCode(ascicode);
      }
    } while (idstr.length < 32);
    return idstr.toLowerCase();
  },
  loader: function loader() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var cb = arguments.length > 1 ? arguments[1] : undefined;
    var loader, appLoader, loading;
    loader = core.element('div', {
      id: core.uniqueid(),
      "class": 'loader'
    });
    appLoader = core.element('div', {
      "class": 'app-loader'
    });
    loading = core.element('div', {
      "class": 'loading fa-spin'
    });
    appLoader.appendChild(loading);
    loader.appendChild(appLoader);
    document.body.appendChild(loader);
    $(loader).fadeOut(time, function () {
      loader.remove();
      core.handle(cb, document);
    });
  },
  scrollTop: function scrollTop(id) {
    var el = document.getElementById(id);
    if (!el) {
      el = core.element('span', {
        id: id,
        "class": 'go-to-top'
      }, function (node) {
        document.body.appendChild(node);
      });
    }
    el.addEventListener('click', function (e) {
      $('body,html').animate({
        scrollTop: 0
      }, 0);
    });
    $(window).scroll(function () {
      if ($(window).scrollTop()) {
        $(el).stop(false, true).css({
          opacity: 1
        });
      } else {
        $(el).stop(false, true).css({
          opacity: 0
        });
      }
    });
  },
  isMobile: function (_isMobile) {
    function isMobile(_x) {
      return _isMobile.apply(this, arguments);
    }
    isMobile.toString = function () {
      return _isMobile.toString();
    };
    return isMobile;
  }(function (cb) {
    if ($(window).width() < 768) {
      isMobile = true;
      document.body.classList.add('mobile');
    } else {
      isMobile = false;
      document.body.classList.add('desktop');
    }
    return core.handle(cb, isMobile);
  }),
  formEditor: function formEditor(name, options) {
    var config = {
      toolbar: 'Normal',
      height: '400',
      allowedContent: true,
      autoParagraph: false,
      language: 'vi',
      filebrowserBrowseUrl: 'https://dienmaytonghop.com/plugins/filemanager/dialog.php?type=1&editor=ckeditor&fldr=news/11-2024&akey=feb0d17ef521e6cabe064baaf11a03eb',
      filebrowserUploadUrl: 'https://dienmaytonghop.com/plugins/filemanager/dialog.php?type=1&editor=ckeditor&fldr=news/11-2024&akey=feb0d17ef521e6cabe064baaf11a03eb',
      filebrowserImageBrowseUrl: 'https://dienmaytonghop.com/plugins/filemanager/dialog.php?type=1&editor=ckeditor&fldr=news/11-2024&akey=feb0d17ef521e6cabe064baaf11a03eb&multiple=0'
    };
    if (options) {
      config = Object.assign({}, config, options);
    }
    console.log(config);
    CKEDITOR.replace(name, config);
  },
  init: function init(mod, cb) {
    core.loader(300, function (doc) {
      cb(doc, mod);
      $("main").animate({
        opacity: 1
      });
    });
  }
};
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1.replace(rgx, '$1' + ',' + '$2'), _readOnlyError("x1");
  }
  return x1 + x2;
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
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["6-10", "7-10", "8-10", "9-10", "10-10", "11-10", "12-10", "13-10", "14-10", "15-10", "16-10", "17-10", "18-10", "19-10", "20-10", "21-10", "22-10", "23-10", "24-10", "25-10", "26-10", "27-10", "28-10", "29-10", "30-10", "31-10", "1-11", "2-11", "3-11"],
      datasets: [{
        data: [0, 0, 9, 34, 108, 170, 160, 151, 257, 254, 217, 228, 252, 227, 195, 185, 263, 328, 316, 370, 285, 244, 201, 196, 185, 277, 258, 161, 27],
        fill: false,
        borderWidth: 2,
        tension: 0,
        label: 'Khách',
        borderColor: 'rgba(0,156,226,1)'
      }, {
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderWidth: 2,
        tension: 0,
        label: 'Lược truy cập',
        borderColor: 'rgba(255,111,3,1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Số lượng thống kê người truy cập'
        },
        tooltip: {
          callbacks: {
            label: function label(tooltipItem) {
              var label = tooltipItem.dataset.label || '';
              var value = addCommas(tooltipItem.raw);
              return label + ': ' + value;
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Ngày'
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Lượt truy cập'
          },
          ticks: {
            callback: function callback(value) {
              return addCommas(value);
            }
          }
        }
      }
    }
  });
  window.addEventListener('beforeprint', function () {
    myChart.resize(600, 600);
  });
  window.addEventListener('afterprint', function () {
    myChart.resize();
  });
}
chartInit('areaChartHits');
$(document).on("click", "button.button", function () {
  var self = this.closest(".field-pwd");
  self.querySelector("input").focus();
  if (self.classList.contains("show-pwd")) {
    self.classList.remove("show-pwd");
    self.querySelector("i").setAttribute("class", "fa fa-eye");
    self.querySelector("input").setAttribute("type", "password");
  } else {
    self.classList.add("show-pwd");
    self.querySelector("input").setAttribute("type", "text");
    self.querySelector("i").setAttribute("class", "fa fa-eye-slash");
  }
});
$(function () {
  $(".switch input").on("change", function () {
    var td = this.closest("td");
    if (this.checked) {
      $(td).find(".group-control").removeClass("hide");
      $(td).find(".group-control .form-control").focus();
    } else {
      $(td).find(".group-control").addClass("hide");
    }
  });
});