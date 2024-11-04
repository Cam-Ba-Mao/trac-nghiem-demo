$(function(){
    $(".switch input").on("change", function(){
        let td = this.closest("td");
        if(this.checked) {
            $(td).find(".group-control").removeClass("hide");
            $(td).find(".group-control .form-control").focus();
        }
        else {
            $(td).find(".group-control").addClass("hide");
        }
    });
});