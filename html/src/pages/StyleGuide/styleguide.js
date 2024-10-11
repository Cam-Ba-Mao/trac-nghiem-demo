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

    function handleRichEditors() {
        let elems = document.querySelectorAll(".tinymce-editor");

        if (elems.length === 0) {
            return null;
        }

        if(typeof (themeUri) == 'undefined')
        {
            themeUri = '..'
        }

        elems.forEach((item) => {
            if (typeof tinymce !== 'undefined' && typeof (themeUri) !== 'undefined' && item.id !== '') {
                //console.log("TRYING TO CREATE TINYMCE FOR INPUT " + item.id);
                tinymce.init({
                    selector: '#' + item.id,
                    height: 400,
                    menubar: false,
                    resize: true,
                    plugins: 'lists link image',
                    toolbar: 'styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | link image',
                    branding: false,
                    content_css: [themeUri + '/assets/dist/js/tinymce/custom.min.css?' + new Date().getTime()],
                    setup: function (editor) {
                        editor.on('keyup', (e) => {
                            item.value = tinymce.activeEditor.getContent();
                        });
                    }
                });
            }
        });
    }

    $(function () {
        handleUpload();
        initFeelingParentSlider();
        chartInit('doughnutChart');
        
        handleRichEditors();
    });
})(jQuery);