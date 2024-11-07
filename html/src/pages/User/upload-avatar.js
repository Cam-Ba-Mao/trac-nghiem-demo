(function ($) {
    
    const handleUploadAvatar = (id, options) => {
        const form = document.getElementById(id);
        if(form) {
            Dropzone.autoDiscover = false;
            new Dropzone('#'+id, {
                url: 'upload_avatar.php', // Đảm bảo đường dẫn chính xác đến file PHP xử lý upload
                method: "post", // Phương thức gửi dữ liệu
                paramName: "file", // Tên mặc định cho Dropzone để gửi file
                thumbnailWidth: options.thumbnailWidth,
                thumbnailHeight: options.thumbnailHeight,
                maxFilesize: 5, // MB
                acceptedFiles: 'image/*',
                dictFileTooBig: "Tệp quá lớn ({{filesize}}MB). Tối đa cho phép: {{maxFilesize}}MB.",
                dictInvalidFileType: "Bạn không thể tải lên các tập tin loại này.",
                success: function(file, response) {
                    toast({
                        type: "success",
                        position: "top-right",
                        title: "Cập nhập ảnh Avatar thành công",
                        redirect: 'upload_avatar.php',
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
  
    
    $(function () {      
        handleUploadAvatar('upload-avatar-user', {
            thumbnailWidth: 120,
            thumbnailHeight: 120,
        });

        $(window).on("resize", function () {

        });
    });
})(jQuery);