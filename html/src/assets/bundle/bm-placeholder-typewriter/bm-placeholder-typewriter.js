/*
    BMplaceholderTypewriter
    ===================================
    Author: Ba Mao
 */
(function () {
    "use strict";

    function BMplaceholderTypewriter(element, options) {

        // Plugin Settings
        var settings = Object.assign({
            delay: 50,
            pause: 1000,
            text: []
        }, options);

        // Type given string in placeholder
        function typeString(target, index, cursorPosition, callback) {

            // Get text
            var text = settings.text[index];

            // Get placeholder, type next character
            var placeholder = target.getAttribute('placeholder') || '';
            target.setAttribute('placeholder', placeholder + text[cursorPosition]);

            // Type next character
            if (cursorPosition < text.length - 1) {
                setTimeout(function () {
                    typeString(target, index, cursorPosition + 1, callback);
                }, settings.delay);
                return true;
            }

            // Callback if animation is finished
            callback();
        }

        // Delete string in placeholder
        function deleteString(target, callback) {

            // Get placeholder
            var placeholder = target.getAttribute('placeholder');
            var length = placeholder.length;

            // Delete last character
            target.setAttribute('placeholder', placeholder.substr(0, length - 1));

            // Delete next character
            if (length > 1) {
                setTimeout(function () {
                    deleteString(target, callback);
                }, settings.delay);
                return true;
            }

            // Callback if animation is finished
            callback();
        }

        // Loop typing animation
        function loopTyping(target, index) {

            // Clear Placeholder
            target.setAttribute('placeholder', '');

            // Type string
            typeString(target, index, 0, function () {

                // Pause before deleting string
                setTimeout(function () {

                    // Delete string
                    deleteString(target, function () {
                        // Start loop over
                        loopTyping(target, (index + 1) % settings.text.length);
                    });

                }, settings.pause);
            });
        }

        // Run BMplaceholderTypewriter on the given element
        loopTyping(element, 0);
    }

    // Function to apply the typewriter effect on all matched elements
    function applyToElements(selector, options) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            BMplaceholderTypewriter(element, options);
        });
    }

    // Expose globally
    window.BMplaceholderTypewriter = applyToElements;

}());
