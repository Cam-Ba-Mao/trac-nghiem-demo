(function ($) {
    var paged = 1;
        
    function handleLoadNewsMore() {
        $(document).on('click', '.btn-ajax-read-more', function(e) {
            e.preventDefault();
            
            var element = $(this);
	        var link = $(this).attr('data-url');
	        var total = $(this).attr('data-total');
	        paged++;

	        link += '/page/' + paged;

	        $.ajax({
	            url: link,
	            type: 'GET',
	            cache: false,
	            beforeSend: function (xhr) {                    
	                element.addClass('is-loading');
	            }
	        }).done(function (res) {
	        	var html = $(res);
	        	$('.bm-blog__inner--posts .posts-wrapper').append(html.find('.bm-blog__inner--posts .posts-wrapper').html());
	        	element.removeClass('is-loading');	 
                
                $('.lazy').Lazy({
		            afterLoad: function (elm) {
		                $(elm).css('visibility', 'visible');
		            }
		        });

	        	if( parseInt(paged) >= parseInt(total) ) {
	        		element.closest('.btn-readmore').addClass('d-none');
	        	}

	        }).fail(function (res) {
	            
	        });
        });
    }

    $(function () {
        
        handleLoadNewsMore();
    });
})(jQuery);