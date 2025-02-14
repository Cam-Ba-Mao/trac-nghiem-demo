var core = {
	dd: function(params, isClear){
		if(isClear === true) {
			console.clear();
		}
		console.log(params);
	},
	ul: function(obj, extra, cb){
		var ul;
		ul = core.element('ul', extra);
		$.each(obj, (idx, val) => {
			core.element('li', {
				content: val,
			}, (li) => {
				ul.appendChild(li);
			});
		});
		return core.handle(cb, ul);
	},
	handle: function(cb, args){
		if(cb && typeof cb === 'function') {
			cb(args);
		}
		return args;
	},
	request: function(key, val){
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
		for(i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
			
			if (sParameterName[0] === key) {
				return (sParameterName[1] === undefined) ? true : sParameterName[1];
			}
		}
		return val;
	},
	anchor: function(link, text, extra, cb){
		if(! extra || typeof extra != 'object') {
			extra = {};
		}
		var el;
		extra.href = link;
		extra.content = text;
		el = core.element('a', extra);
		return core.handle(cb, el);
	},
	element: function(tag, options, cb){
		node = document.createElement(tag);
		if(options && typeof options === 'string') {
			node.innerHTML = options;
		}
		if(options && typeof options.content != 'undefined') {
			node.innerHTML = options.content;
			delete options.content;
		}
		if(options && typeof options === 'object') {
			$.each(options, (name, value) => {
				node.setAttribute(name, value);
			});
		}
		node = core.handle(options, node);
		node = core.handle(cb, node);
		return node;
	},
	mailto: function(email, text, cb){
		var fname, mailto;
		fname = arguments.callee.name;
		text = core.strEmpty(text, email);
		email = fname+':'+email;
		mailto = core.anchor(email, text);
		return core.handle(cb, mailto);
	},
	isNum: function(e){
		if (e.srcElement) {kc =  e.keyCode;} else {kc =  e.which;}
		if ((kc < 47 || kc > 57) && kc != 8 && kc != 0) return false;
		return true;
	},
	toArray: function(obj){
		var arr = [];
		$.each(obj, (key, val) => {
			arr[key] = val;
		});
		return arr;
	},
	toObject: function(arr){
		return Object.assign({}, arr);
	},
	strPad: function(str, len, pad) {
	  str = str.toString();
	  return (str.length<len) ? core.strPad(pad+str, len) : str;
	},
	strSlug: function(str){
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
	strEmpty: function(str, val){
		return str ? str : val;
	},
	strExcerpt: function(str, len, more){
		if(! Number(len)) return str;
		var cut = str.indexOf(' ', len);
		if(cut == -1) return str;
		str = str.substring(0, cut);
		str += core.strEmpty(more, '...');
		return str;
	},
	strReplace: function(str, find, replace){
		return str.replace(new RegExp(find, 'g'), replace);
	},
	strNumber: function(str){
		var opts = { minimumFractionDigits: 0 },
		n = str.toLocaleString(undefined, opts);
		return n;
	},
	addNode: function(tag, options, cb){
		return core.element(tag, options, cb);
	},
	metaTag: function({name, content, args}, cb){
		if(! args) {
			args = {
				name: name,
			};
		} else {
			args = Object.assign({
				name: name,
			}, args);
		}
		var el, d = document, t = 'meta';
		el = core.element(t, args);
		el.content = content;
		metas = d.getElementsByTagName(t);
		metas[metas.length-1].after(el);
		return core.handle(cb, el);
	},
	linkTag: function({src, args}, cb){
		if(! args) {
			args = {
				href: src,
				rel: 'stylesheet',
				type: 'text/css',		
			}
		} else {
			args = Object.assign({href: src}, args);
		}
		var el, d = document, t = 'link';
		el = core.element(t, args);
		links = d.getElementsByTagName(t);
		links[links.length-1].after(el);
		return core.handle(cb, el);
	},
	scriptTag: function({src, args}, cb){
		if(! args) {
			args = {
				src: src,
				language: 'javascript',
				type: 'text/javascript',		
			}
		} else {
			args = Object.assign({src: src}, args);
		}
		var el, d = document, t = 'script';
		el = core.element(t, args);
		el.async = true;
		links = d.getElementsByTagName(t);
		links[links.length-1].after(el);
		return core.handle(cb, el);
	},
	callAjax: function({url, data, beforeSend}, cb){
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
			beforeSend: beforeSend,
			success: (response) => {
				cb(response);
			}
		});
	},
	loadAjax: function({module, action, data, beforeSend}, cb){
		core.callAjax({
			url: root+module+'/ajax/'+action,
			data: data,
			beforeSend: beforeSend,
		}, (response) => {
			cb(response);
		});
	},
	modAjax: function(doaction, {data, beforeSend}, cb){
		core.callAjax({
			url: ajaxUrl+doaction,
			data: data,
			beforeSend: beforeSend,
		}, (response) => {
			cb(response);
		});
	},
	uniqueid: function(){
		var idstr = String.fromCharCode(Math.floor((Math.random()*25)+65));
		do {                
			var ascicode=Math.floor((Math.random()*42)+48);
			if(ascicode<58 || ascicode>64){
				idstr+=String.fromCharCode(ascicode);    
			}                
		} while (idstr.length<32);
		return idstr.toLowerCase();
	},
	loader: function(time = 0, cb){
		var loader, appLoader, loading;
		loader = core.element('div', {
			id: core.uniqueid(),
			class: 'loader',
		});
		appLoader = core.element('div', {
			class: 'app-loader',
		});
		loading = core.element('div', {
			class: 'loading fa-spin',
		});
		appLoader.appendChild(loading);
		loader.appendChild(appLoader);
		document.body.appendChild(loader);
		$(loader).fadeOut(time, () => {
			loader.remove();
			core.handle(cb, document);
		});
	},
	scrollTop: function(id){
		var el = document.getElementById(id);
		if(! el) {
			el = core.element('span', {
				id: id,
				class: 'go-to-top',
			}, (node) => {
				document.body.appendChild(node);
			});
		}
		el.addEventListener('click', (e) => {
			$('body,html').animate({scrollTop: 0}, 0);
		});
		$(window).scroll(() => {
			if($(window).scrollTop()) {
				$(el).stop(false, true).css({opacity: 1});
			} else {
				$(el).stop(false, true).css({opacity: 0});
			}
		});
	},
	isMobile: function(cb){
		if($(window).width()<768) {
			isMobile = true;
			document.body.classList.add('mobile');
		} else {
			isMobile = false;
			document.body.classList.add('desktop');
		}
		return core.handle(cb, isMobile);
	},

	formEditor: function(name, options) {
		// Kiểm tra xem phần tử có tồn tại trong DOM không
		if (!document.getElementById(name)) {
			// console.warn(`Element with ID "${name}" does not exist.`);
			return; // Dừng hàm nếu phần tử không tồn tại
		}

		let config = {
			toolbar: 'Normal',
			height: '400',
			allowedContent: true,
			autoParagraph: false,
			language: 'vi',
			filebrowserBrowseUrl : 'https://dienmaytonghop.com/plugins/filemanager/dialog.php?type=1&editor=ckeditor&fldr=news/11-2024&akey=feb0d17ef521e6cabe064baaf11a03eb',
			filebrowserUploadUrl : 'https://dienmaytonghop.com/plugins/filemanager/dialog.php?type=1&editor=ckeditor&fldr=news/11-2024&akey=feb0d17ef521e6cabe064baaf11a03eb',
			filebrowserImageBrowseUrl : 'https://dienmaytonghop.com/plugins/filemanager/dialog.php?type=1&editor=ckeditor&fldr=news/11-2024&akey=feb0d17ef521e6cabe064baaf11a03eb&multiple=0'

		};

		// Gộp cấu hình mặc định với options truyền vào
		if (options) {
			config = Object.assign({}, config, options);
		}
		console.log(config);

		// Khởi tạo CKEditor
		CKEDITOR.replace(name, config);
	},

	init: function(mod, cb){
		core.loader(300, (doc) => {
			cb(doc, mod);
			$("main").animate({opacity: 1});
		});
	},

};