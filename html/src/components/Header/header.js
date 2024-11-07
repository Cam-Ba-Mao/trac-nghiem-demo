(function ($) {
    function toggleDropdown() {
        document.addEventListener('click', function(e) {
            const button = e.target.closest(".avatar-container"); 
            
            if (button) {
                document.getElementById("dropdownMenu").classList.toggle("show");
            }
        });
    }

    window.onclick = function(event) {
        if (!event.target.matches('.avatar')) {
            var dropdowns = document.getElementsByClassName("dropdown-menu");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    $(function () {
        toggleDropdown();
    });

})(jQuery);