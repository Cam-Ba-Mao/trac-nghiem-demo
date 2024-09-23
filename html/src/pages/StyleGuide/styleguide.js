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

(function ($) {
    

    $(function () {
        
       
    });
})(jQuery);