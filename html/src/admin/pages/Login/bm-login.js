$(document).on("click", "button.button", function(){
    var self = this.closest(".field-pwd");
    self.querySelector("input").focus();
    if(self.classList.contains("show-pwd")) {
        self.classList.remove("show-pwd");
        self.querySelector("i").setAttribute("class", "fa fa-eye");
        self.querySelector("input").setAttribute("type", "password");
    }
    else {
        self.classList.add("show-pwd");
        self.querySelector("input").setAttribute("type", "text");
        self.querySelector("i").setAttribute("class", "fa fa-eye-slash");
    }
});