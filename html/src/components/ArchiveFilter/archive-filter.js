(function ($) {
    function initializeCustomSelect(selectId, customSelectId) {
        var select = $(selectId);
        var customSelect = $(customSelectId);
        var optionsList = customSelect.find('.options');

        // Hide the default select box
        select.hide();

        // Populate the options list
        select.find('option').each(function () {
            var optionValue = $(this).val();
            var optionText = $(this).text();
            optionsList.append('<li data-value="' + optionValue + '">' + optionText + '</li>');
        });

        // Set the first option as the default selected and active option
        var firstOption = optionsList.find('li').first();
        firstOption.addClass('active');
        var firstOptionValue = firstOption.attr('data-value');
        var firstOptionText = firstOption.text();
        customSelect.find('.select-style').text(firstOptionText);
        select.val(firstOptionValue);

        // Click event to toggle the options list
        customSelect.find('.select-style').on('click', function () {
            optionsList.toggle();
        });

        // Click event to select an option
        customSelect.find('.options li').on('click', function () {
            var selectedOptionValue = $(this).attr('data-value');
            var selectedOptionText  = $(this).text();

            customSelect.find('.select-style').text(selectedOptionText );
            select.val(selectedOptionValue );
            optionsList.find('li').removeClass('active');
            $(this).addClass('active');
            optionsList.hide();

            // Trigger a change event on the hidden select
            select.trigger('change');
        });

        // Close the options list when clicking outside the select box
        $(document).on('click', function (event) {
            if (!$(event.target).closest(customSelectId).length) {
                optionsList.hide();
            }
        });
    }
    
    $(function () {
        initializeCustomSelect('#select-1', '#select-position');   
    });
})(jQuery);