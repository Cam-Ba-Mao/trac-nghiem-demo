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
        showCloseButton: true,
    });
}

BMplaceholderTypewriter('#search-animation', {
    delay: 50,
    pause: 1000,
    text: ["Bạn cần tìm gì..", "Nhập tên sản phẩm.."]
});

function toggleRow(button) {
    let tr = button.closest('tr');
    let table = tr.closest('table');
    let colspan = $(tr).find('td:not(.toggle-btn)').length;
    let toggleRow = `<tr class="table-row" data-id="${tr.dataset.id}"><td colspan="${colspan}">`;
    let toggleIcon = {
        close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H8C7.44772 8 7 7.55228 7 7Z" fill="#111827"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12Z" fill="#111827"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 17C7 16.4477 7.44772 16 8 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H8C7.44772 18 7 17.5523 7 17Z" fill="#111827"/>
                    <path d="M5 7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6C4.55228 6 5 6.44772 5 7Z" fill="#111827"/>
                    <path d="M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12Z" fill="#111827"/>
                    <path d="M5 17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16C4.55228 16 5 16.44772 5 17Z" fill="#111827"/>
                </svg>`,
        open: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#111827"/>
                </svg>`
    };
    $(table).find('.table-row').remove();
    $(table).find('.toggle-btn').html(toggleIcon.close);
    $(table).find('thead th').each((i, e) => {
        if (i) {
            let value = $(tr).find('.column-' + e.id).html();
            toggleRow += `<div class="field-mobile field-${e.id}"><strong>${e.textContent}: </strong>${value}</div>`;
        }
    });
    toggleRow += '</td></tr>';

    if (tr.classList.contains('is-toggle')) {
        tr.classList.remove('is-toggle');
        $(table).find('.toggle-btn').html(toggleIcon.close);
    }
    else {
        $(table).find('tr').removeClass('is-toggle');
        $(toggleRow).insertAfter($(tr)).ready(() => {
            tr.classList.add('is-toggle');
            $(button).html(toggleIcon.open);
        });
    }
}

function handleRichEditors(optionsById = {}) {
    let elems = document.querySelectorAll(".tinymce-editor");

    if (elems.length === 0) {
        return null;
    }

    if (typeof themeUri === 'undefined') {
        themeUri = '..';
    }

    elems.forEach((item) => {
        if (typeof tinymce !== 'undefined' && typeof themeUri !== 'undefined' && item.id !== '') {
            // Các option mặc định chung
            let defaultOptions = {
                selector: '#' + item.id,
                height: 400,
                menubar: false,
                resize: true,
                language: 'vi',
                plugins: 'lists link media image advlist anchor autolink autoresize autosave charmap code directionality emoticons fullscreen help preview quickbars save searchreplace table visualblocks wordcount',
                toolbar: 'styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | forecolor backcolor lists link media image advlist anchor autolink autoresize autosave charmap code directionality emoticons fullscreen help preview quickbars save searchreplace table visualblocks wordcount',
                branding: false,
                // content_css: [themeUri + '/assets/dist/js/tinymce/custom.min.css?' + new Date().getTime()],
                setup: function (editor) {
                    editor.on('keyup', (e) => {
                        item.value = tinymce.activeEditor.getContent();
                    });
                }
            };

            // Lấy các options riêng theo ID
            let customOptions = optionsById[item.id] || {};

            // Kết hợp các options mặc định với các options riêng
            let editorOptions = Object.assign({}, defaultOptions, customOptions);

            tinymce.init(editorOptions);
        }
    });
}

(function ($) {
    const handleUpload = () => {
        const form = document.getElementById('demo-upload');
        if(form) {
            Dropzone.autoDiscover = false;
            new Dropzone('#demo-upload', {
                thumbnailHeight: 120,
                thumbnailWidth: 120,
                maxFilesize: 5, // MB
                acceptedFiles: 'image/*',
                dictFileTooBig: "Tệp quá lớn ({{filesize}}MB). Tối đa cho phép: {{maxFilesize}}MB.",
                dictInvalidFileType: "Bạn không thể tải lên các tập tin loại này.",
                success: function(file, response) {
                    toast({
                        type: "success",
                        position: "top-right",
                        title: "Hình ảnh đã được tải lên thành công.",
                        redirect: response.redirect,
                    });
                },
                error: function (file, message) {
                    toast({
                        type: "error",
                        position: "top-right",
                        title: message,
                    });
                    form.classList.remove('dz-started');
                    $(form).find('.dz-preview').remove();
                    return false;
    
                }
            });
        }
    }

    function initFeelingParentSlider() {
        if ($(".bm-feeling-parent__slider").length < 1) return;

        let duration = document.querySelector(".bm-feeling-parent__slider").getAttribute("data-duration");        

        const swiper = new Swiper(".bm-feeling-parent__slider", {
            speed: 500,
            slidesPerView: 1.3,
            spaceBetween: 16,
            // loop: true,
            autoplay: {
                delay: duration*1000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.bm-feeling-parent__navigation .button-next',
                prevEl: '.bm-feeling-parent__navigation .button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3.2,
                    
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2.6,
                    
                },

                
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
        const ctx = document.getElementById(canvas);
        if (!ctx) {
            return; // Ngừng thực hiện nếu không có canvas
        }

        if (!config) {
            config = {
                chart: {
                    totalSum: 8,
                    dataValues: [6, 1, 1],
                    labels: ["Chưa liên hệ", "Chưa nghe máy", "Đã liên hệ"],
                    backgroundColor: ["#E03137", "#E6BB20", "#0CAF60"],
                }
            };
        }
        var totalSum = config.chart.totalSum;
        var dataValues = config.chart.dataValues;
        const legendElement = document.getElementById('my-legend-request');
        const centerTextPlugin = {
            id: 'centerTextPlugin',
            beforeDraw: function (chart) {
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
    
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: config.chart.labels,
                datasets: [
                    {
                        data: dataValues,
                        backgroundColor: config.chart.backgroundColor,
                        borderRadius: 6,
                        spacing: 3,
                    },
                ],
            },
            options: {
                elements: {
                    center: {
                        text: totalSum,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = $('#doughnutChart').attr('data-quantity');
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
                cutout: 90,
            }
        });
    
        Chart.register(centerTextPlugin);
    
        window.addEventListener('beforeprint', () => {
            myChart.resize(600, 600);
        });
        window.addEventListener('afterprint', () => {
            myChart.resize();
        });
    
        if (legendElement) {
            legendElement.innerHTML = createCustomLegend(myChart);
        }
    }    

    function handleButtonViewImage() {
        document.addEventListener('click', function(e) {
            const button = e.target.closest(".btn-view-image"); 
            
            if (button) {
                // console.log('Button clicked');
                
                const id = button.closest('tr').dataset.id; 
                const row = document.querySelector('[data-id="' + id + '"]'); 
                const img = row.querySelector('img'); 
                let index = 0;
                let i = 0;
                let sources = [];
                let element = button.closest('tbody'); 
        
                if (img) {
                    const imgUrl = img.getAttribute('src'); 
    
                    const images = element.querySelectorAll('img'); 
                    if (images.length > 0) {
                        images.forEach((imgElement, e) => { 
                            if (imgElement.getAttribute('src') === imgUrl) {
                                index = i;
                            }
    
                            let source = {
                                "src": imgElement.getAttribute('src'),
                                "thumb": imgElement.getAttribute('src')
                            };
    
                            sources.push(source);
                            i++;
                        });
                    }
    
                    let dynamicGallery = window.lightGallery(button, {
                        dynamic: true,
                        plugins: [lgVideo, lgAutoplay, lgThumbnail],
                        dynamicEl: sources,
                        download: false,
                        counter: false,
                        slideShowAutoplay: (sources.length > 1),
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
        if( $('.bm-time-regulations-bullet__title').length > 0) {
            $('.bm-time-regulations-bullet__title').matchHeight();
        }
    }

    function initTimeRegulationsSlider(paginationData) {
        if( $('.bm-time-regulations__list').length < 1 ) return;
        
        // let paginationData;

        // Kiểm tra nếu biến chưa được khởi tạo thì khởi tạo lại
        if (typeof paginationData === 'undefined') {
            paginationData = [
                {
                    icon: {
                        url :"/images/styleguide/time-regulations-icon-1.svg"
                    }, 
                    title: "Nộp hồ sơ",
                    time: "20/04  - 02/05/2023"
                },
                {
                    icon: {
                        url :"/images/styleguide/time-regulations-icon-2.svg"
                    }, 
                    title: "Thi Viết Luận (Tại trường)",
                    time: "20/04  - 02/05/2023"
                },
                {
                    icon: {
                        url :"/images/styleguide/time-regulations-icon-3.svg"
                    }, 
                    title: "Phỏng vấn cùng Ban Giám Hiệu",
                    time: "20/04  - 02/05/2023"
                },
                {
                    icon: {
                        url :"/images/styleguide/time-regulations-icon-4.svg"
                    }, 
                    title: "Công bố học bổng",
                    time: "20/04  - 02/05/2023"
                },
            ];
        }
        
        // console.log(paginationData);
        let lang = $('html').attr('lang');

        if(lang == 'vi') {
            var timetext = " Thời gian:";
           
        } else {
            var timetext = " Time:";
        }
  
        const mySwiper = new Swiper('.bm-time-regulations__list', {
            speed: 400,
            slidesPerView: 1,
            spaceBetween: 52,
            // loop: true,
            allowSlideNext: true,
            spaceBetween: 0,
            initialSlide: 1,
            slidesPerView: 1,
            effect: "fade",
            autoplay: { delay: 3e3, waitForTransition: !1 },
            allowTouchMove: !1,
            simulateTouch: !1,
            on: {
                afterInit: function () {
                    handleMatchHeightTimeRegulationsBullet();
                },
            },
            pagination: {
                el: ".bm-time-regulations__pagination",
                clickable: true,
                type: "bullets",
                bulletClass: "bm-time-regulations-bullet",
                bulletActiveClass: "bm-time-regulations-bullet__active",
                renderBullet: function(index, className) {
                    if (paginationData[index]) { // kiểm tra xem phần tử tại index có tồn tại không
                        var item = paginationData[index];
                        return '<button class="' + className + '">' +
                              '<span class="bm-time-regulations-bullet__image">' +
                              '<img src="' + item.icon['url'] + '" alt="" />' +
                              '</span>' +
                              '<span class="bm-time-regulations-bullet__title">' +
                              item.title +
                              '</span>' +
                              '<span class="bm-time-regulations-bullet__item"> ' +
                              '<span class="line"></span>' +
                              '<span class="bullet"></span>' +
                              '</span>' +
                              '<span class="bm-time-regulations-bullet__time">'+ timetext +'<br /><span>' +
                              item.time +
                              '</span></span>' +
                              '</button>';
                        // return (
                        //     '<button class="' +className +'"><span class="bm-time-regulations-bullet__time">' +
                        //     item.time +
                        //     '</span><span class="bm-time-regulations-bullet__item"><span class="line"></span><span class="bullet"></span></span><span class="bm-time-regulations-bullet__title">' +
                        //     item.title +
                        //     "</span></button>"
                        // );
                    }
                }
            },
            
        });

        var soSlide = mySwiper.slides.length / mySwiper.params.slidesPerView;
        // console.log(soSlide); 
        $('.bm-time-regulations').find('.container-fluid').attr('style','--slides-count:'+ soSlide )
        //slidesPerView được thiết lập thành 4, do đó mỗi swiper-slide sẽ có chiều rộng bằng 1/4 chiều rộng của container Swiper. 
        //Biến soSlide sẽ tính toán số swiper-slide hiện có trong Swiper bằng cách chia tổng số slide cho slidesPerView
    }

    function handleIntro() {
        if( $('.bm-intro__wrap').length > 0 ) {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function() {
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
                    }, 0)
                },
                "(max-width: 767px)": function() {
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
                    }, 0)
                }
            });
        }
    }

    var isRunCounter = false;

    function handleCounterNumber() {
        if($('.bm-number__item--number').length < 1) return;

        if(isRunCounter) return;

        var elValFromTop;
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(window).scrollTop();

        elValFromTop = Math.ceil($('.bm-number__item--number').offset().top);

        if ((windowHeight + windowScrollValFromTop) > elValFromTop) {
            counter();
            isRunCounter = true;
        }
    }

    function counter() {
        if( $('.bm-number__item--number').length < 1 ) return false;
        
        $('.bm-number__item--number').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    now = Math.ceil(now);
                    if( now.toString().length < 2 ) {
                        now = '0' + now.toString();
                    } else {
                        now = new Intl.NumberFormat('de-DE').format(Math.ceil(now))
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

        $(document).on('click', '.bm-why-join__arrow--prev', function(e) {
            e.preventDefault();

            let index = $('.bm-why-join__body .nav-link.active').index();
            let total = $('.bm-why-join__body .nav-link').length;
            index--;
            index = index < 0 ? (total - 1) : index;
            $('.bm-why-join__body .nav-link:eq('+ index +')').trigger('click');
        });

        $(document).on('click', '.bm-why-join__arrow--next', function(e) {
            e.preventDefault();

            let index = $('.bm-why-join__body .nav-link.active').index();
            let total = $('.bm-why-join__body .nav-link').length;
            index++;

            index = index >= total ? 0 : index;
            $('.bm-why-join__body .nav-link:eq('+ index +')').trigger('click');
        });
    }
    
    var myTimeoutHover;

    function handleCardWhyUs() {
        $(".isa-why-us__item").each(function () {
            let headHeight = $(this).find('.isa-why-us__item--head').outerHeight();
            let bodyHeight = $(this).find('.isa-why-us__item--body').outerHeight();
            let itemHeight = headHeight + bodyHeight
            $(this).attr('style', '--itemHeight:' + itemHeight + 'px; --headHeight:' + headHeight + 'px');
        });

        $(".isa-why-us__list .isa-why-us__item").hover(function () {
            clearTimeout(myTimeoutHover);

            myTimeoutHover = setTimeout(() => {
                $('.isa-why-us__list .isa-why-us__item').removeClass('is-active');
                $(this).addClass('is-active');

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
    
        tabsNav.on('click', '.btn-tag', function(e) {
            var index = $(this).index();
            
            tabsNav.find('.btn-tag').removeClass('active');
            $(this).addClass('active');
    
            addClassToElements(images, index);
            addClassToElements(imagesCard, index);
            addClassToElements(txtCard, index);
    
        });
    }

    var handlePromotion = function(){
        $("#siss-promotion .siss-tabs a").on("click", function(e){
            e.preventDefault();
            if(this.classList.contains("active")) {
                return false;
            }
            let id = (this.href).split("#")[1],
            item = document.getElementById(id),
            node = document.getElementById("siss-promotion");
            $(node).find(".siss-tabs a").removeClass("active");
            $(this).addClass("active");
            $(node).find(".siss-promotion__panel.active").css({
                opacity: 0,
                transform: "translateY(50%) scale(1.06)",
            });
            $(node).find(".siss-promotion__panel.active").animate({
                opacity: 0,
            }, 300, function(){
                $(item).addClass("active");
                $(this).removeAttr("style");
                $(this).removeClass("active");
            });
            
        });
    };

    function handleBuildingGreatness() {
        $(document).on('click', '.rt-building-greatness__item', function (e) {    
            let element = $(this);
    
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

        let numberItems = $('.rt-building-greatness__item').length;
        $('.rt-building-greatness__list').attr('style', '--number-items: ' + numberItems);
    }

    function handleSliderBuildingGreatness() {
        if ($('.rt-building-greatness__slider').length < 1) return;

        let BuildingGreatness = new Swiper('.rt-building-greatness__slider', {
            slidesPerView: 1.4,
            spaceBetween: 16,
            loop: true,
            on: {
                afterInit: function () {
                    $('.rt-building-greatness__slider .lazy').Lazy({
                        afterLoad: function (el) {
                            $(el).addClass('loaded');
                            // handleIE();
                        }
                    });
                },
                slideChange: function () {
                    $('.rt-building-greatness__slider .lazy').Lazy({
                        afterLoad: function (el) {
                            $(el).addClass('loaded');
                            // handleIE();
                        }
                    });
                },
                
            },
            breakpoints: {
                // when window width is >= 320px
                375: {
                    slidesPerView: 1.6,
                },

                576: {
                    spaceBetween: 24,
                    slidesPerView: 2.8,
                },
            }
        });

        BuildingGreatness.on('slideChange', function () {
            $('.swiper-slide .rt-building-greatness__item--video video').each(function () {
                this.pause();
            });
            $('.swiper-slide .rt-building-greatness__item--video video').prop('preload', 'none');
            $('.swiper-slide .rt-building-greatness__item--video video').prop('autoplay', false);
           
            setTimeout(function(){
                let activeSlide = $('.swiper-slide.swiper-slide-active');
                activeSlide.find(".rt-building-greatness__item--video video").prop('preload', 'auto');
                activeSlide.find(".rt-building-greatness__item--video video").prop('autoplay', true);
                let videoElement = activeSlide.find(".rt-building-greatness__item--video video")[0];
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
                businessField.attr('data-total-items',totalItem);
                businessField.css('height', 'calc(80vh * ' + totalItem + ')');

                var scrollPosition = (function (field, inner) {
                    var totalItems = field.attr("data-total-items");
                    var fieldHeight = field.outerHeight();
                    var fieldOffsetTop = field.offset().top;
                    var innerHeight = inner.outerHeight();
                    var innerOffsetTop = inner.offset().top - (fieldOffsetTop + innerHeight) + innerHeight;
                    var scrollPercentage = Math.round((innerOffsetTop / (fieldHeight - innerHeight)) * 100);
                    var itemPercentage = 100 / totalItems;
                    var percentages = [];
            
                    for (var i = 1; i <= totalItems; i++) {
                        percentages.push(i * itemPercentage);
                    }
            
                    if (0 < scrollPercentage && scrollPercentage < 100) {
                        return (function (percentages, scrollPercentage) {
                            for (var i = 0; i < percentages.length; i++) {
                                if (scrollPercentage < percentages[i]) {
                                    return i;
                                }
                            }
                            return -1;
                        })(percentages, scrollPercentage);
                    }
                })(businessField, businessFieldInner);
            
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
                    var listItemHeight = multiCtaWrapper.outerHeight() / listLength /2;
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
        $(document).on('click', '.load-more-team', function(e) {
            e.preventDefault();
            
            var element = $(this);
	        var paged = $(this).attr('data-page');
	        var total = $(this).attr('data-total');
	        paged++;

	        $.ajax({
	            url: wp_vars.ajax_url,
                data: {
                    paged: paged,
                    action: "load_more_member",
                },
	            type: 'POST',
	            cache: false,
	            beforeSend: function (xhr) {                    
	                element.addClass('is-loading');
	            }
	        }).done(function (res) {
	        	element.removeClass('is-loading');

                if(!res.success){
                    $.rt_noti('Load more member fail', 2000);
                } else {                    
                    $('#category-all .rt-meet-the-team__list').append(res.data.member_html);

                    $('.lazy').Lazy({
                        afterLoad: function (elm) {
                            $(elm).css('visibility', 'visible');
                        }
                    });
    
                    if( parseInt(paged) >= parseInt(total) ) {
                        element.closest('.rt-meet-the-team__cta').remove();
                    }
                }
                
	        }).fail(function (res) { 
	            
	        });
        });
    }

    function initSliderBanner() {
        if( $('.isa-home-banner__slider').length < 1 ) return;
        const progressCircle = $(".isa-home-banner__pager .rt-progress.over");
        const progressContent = $(".isa-home-banner__pager span");
        
        const sliderBanner = new Swiper('.isa-home-banner__slider', {
            slidesPerView: 1,
            spaceBetween: 16,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 6500,
                disableOnInteraction: false,
            },
           
            pagination: {
                el: '.slider-pagination-banner',
                clickable: true,
                type: "bullets",
                bulletClass: "isa-bullet",
                bulletActiveClass: "is-active",
                renderBullet: function (index, className) {
                    var slide = this.slides[index];
                    var pagerCategory = slide.dataset.pagerCategory;
                    var pagerTitle = slide.dataset.pagerTitle;
                    return '<div class="' + className + '"><div class="pager__item"><span><strong>' + pagerCategory + '</strong></span></div> </div>';
                }
                
            },
            on: {
                
                autoplayTimeLeft(s, time, progress) {
                    // console.log(progress);
                    // progressCircle.style.setProperty("--progress", 1 - progress);
                    progressCircle.attr('style','--progress:'+ (1 - progress));
                    progressContent.textContent = `${Math.ceil(time / 1000)}s`;
                    
                }
            },
            navigation: {
                nextEl: '.tohs-prestigious-university__arrow .tohs-swiper-next',
                prevEl: '.tohs-prestigious-university__arrow .tohs-swiper-prev',
            },       
            
        });

        var toggleButton = document.getElementById('toggleButtonPause');
        var pager = $('.isa-home-banner__pager');
        var video = $('.isa-home-banner__video video');
        var isPlaying = true;

        // Make sure the video plays inline instead of full screen
        video.attr('playsinline', '');
        video.attr('webkit-playsinline', '');

        toggleButton.addEventListener('click', function() {
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
        if( $('.isa-home-banner .isa-bullet .pager__item').length > 0) {
            $('.isa-home-banner .isa-bullet .pager__item').matchHeight();
        } 
    }

    function initSliderVistLocation() {
        if( $('.isa-vist-location__list').length < 1 ) return;

        const swiper = new Swiper('.isa-vist-location__list', {
            speed: 400,
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            allowSlideNext: true,
            pagination: {
                el: ".isa-vist-location__pagination--bulet",
                clickable: true,
            },
            navigation: {
                nextEl: '.isa-vist-location__arrow--next',
                prevEl: '.isa-vist-location__arrow--prev',
            },
           
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    
                },
                // when window width is >= 768px
                576: {
                    slidesPerView: 2,
                    
                },

                
            }
        });
    }

    let sliderInstances = {};

    function initPrestigiousUniversitySlider(elementTop, tabId) {
        if ($('.isa-prestigious-university__list').length < 1) return;

        // console.log(sliderInstances);
    
        if (sliderInstances[tabId]) {
            // Slider đã được khởi tạo, không khởi tạo lại
            return;
        }
    
        const sliderUniversity = new Swiper(elementTop, {
            slidesPerView: 1.2,
            spaceBetween: 16,
            centeredSlides: true,
            loop: true,
            lazy: true,
            speed: 500,
            pagination: {
                el: ".isa-prestigious-university__pagination--nav",
                type: "progressbar",
            },
            on: {
                init: function() {
                    updatePaginationCounter();
                    handleMatchHeightTitle();
                },
                slideChangeTransitionEnd: function() {
                    handleMatchHeightTitle();
                    updatePaginationCounter();
                },
                resize: function() {
                    handleMatchHeightTitle();
                    calcWidthSlider(); 
                }
            },
            navigation: {
                nextEl: '.isa-prestigious-university .isa-swiper-next',
                prevEl: '.isa-prestigious-university .isa-swiper-prev',
            },
            breakpoints: {
                768: {
                    spaceBetween: 32,
                    slidesPerView: 1.5,
                },
                992: {
                    slidesPerView: 1.4,
                    spaceBetween: 48,
                },
                1600: {
                    slidesPerView: 1.7,
                    spaceBetween: 54,
                },
            },
        });
    
        sliderInstances[tabId] = sliderUniversity;
    
        calcWidthSlider();
        updatePaginationCounter(); 
        handleMatchHeightTitle();
       
    }
    
    function updatePaginationCounter() {
        let currentTab = $('#UniversityTab').find('.nav-link.active').attr('id');
        let currentSwiper = document.getElementById(currentTab + '-content').querySelector('.swiper-container');
        let currentSlide = (currentSwiper.swiper.realIndex + 1).toString().padStart(2, '0');
        let totalSlides = (currentSwiper.swiper.slides.length).toString().padStart(2, '0');
    
        $('.isa-prestigious-university__pagination--count').find(".current").text(currentSlide);
        $('.isa-prestigious-university__pagination--count').find(".total").text(totalSlides);
    }

    function handleMatchHeightTitle() {
        let maxHeight = 0;
    
        $('.isa-prestigious-university .content-top__title').css('height', 'auto');
    
        $('.isa-prestigious-university .content-top__title').each(function() {
            let height = $(this).outerHeight();
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
            let elementTop = '#UniversityTabContent .tab-pane.active .isa-prestigious-university__list';
            let tabId = $('#UniversityTabContent .tab-pane.active').attr('id');
            initPrestigiousUniversitySlider(elementTop, tabId);
        }
    
        $('.isa-prestigious-university__nav button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            let elementTop = '#UniversityTabContent .tab-pane.active .isa-prestigious-university__list';
            let tabId = $('#UniversityTabContent .tab-pane.active').attr('id');
            initPrestigiousUniversitySlider(elementTop, tabId);
            updatePaginationCounter();
            
        });
       
    }
    
    function calcWidthSlider() {
        let fullWidthSlider = $('#UniversityTabContent').outerWidth();
        let widthSlideCenter = $('.isa-prestigious-university__list .swiper-slide-active').outerWidth();
        let result = (fullWidthSlider - widthSlideCenter)/2;
        widthSlideCenter = widthSlideCenter + 24;
    
        $('.isa-slider-prestigious-university-container').css('max-width', widthSlideCenter + 'px'); 
        $('.isa-prestigious-university__list').attr('style','--positionArrow:'+ result +'px')
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
        $(window).on('scroll', function() {
            handleCounterNumber();
            // Scroll chuyển hình với nội dung
            handleScrollBusinessField();
            handleImageTopBusinessField();
        });

    });
})(jQuery);