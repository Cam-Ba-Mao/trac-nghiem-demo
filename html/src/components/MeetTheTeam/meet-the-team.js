(function ($) {

    function handleDetailMeetTheTeam() {
        if( $('.rt-meet-the-team__item').length < 1) return;

        $(document).on('click', '.rt-meet-the-team__item', function (e) {
            e.preventDefault();
           
            let element = $(this);
            let modal = $('#popup-detail-team'); 

            if(modal.length) {
                let image = $(element).find('.rt-meet-the-team__item--img-popup img').length > 0 ? $(element).find('.rt-meet-the-team__item--img-popup img').attr('src') : '';
                let title = $(element).find('.rt-meet-the-team__item--wrap .title').length > 0 ? $(element).find('.rt-meet-the-team__item--wrap .title').text() : '';
                let data = $(element).find('.rt-meet-the-team__item--content').html();
        
                if(image.length > 0) {
                    modal.find('.rt-popup-detail-team__image img').attr('src', image);
                    modal.find('.rt-popup-detail-team__image').removeClass('d-none');
                    
                } else {
                    modal.find('.rt-popup-detail-team__image').addClass('d-none');
                }
                
                if(title.length > 0) {
                    modal.find('.rt-popup-detail-team__title').html(title);
                    modal.find('.rt-popup-detail-team__title').removeClass('d-none');
                } else {
                    modal.find('.rt-popup-detail-team__title').addClass('d-none');
                }

                if(data.length > 0) {
                    
                    modal.find('.rt-popup-detail-team__content').html(data);
                    modal.find('.rt-popup-detail-team__content').removeClass('d-none');
                } else {
                    modal.find('.rt-popup-detail-team__content').addClass('d-none');
                }

                modal.modal('show'); 
            }

        });
    }

    $(function () {
        handleDetailMeetTheTeam();

    });
})(jQuery);