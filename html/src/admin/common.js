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

handleRichEditors();