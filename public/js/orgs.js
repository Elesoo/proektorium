    $(document).on("keyup", '.orgs_search input', function (e) {
        var str = $(this).val().toLowerCase();
        //var clear_search = $('#clear_search');
        var skills_li = $('.brand-project');


        if (str.length > 2) {
            skills_li.each(function (i, e) {
            	if ($(e).text().toLowerCase().indexOf(str) != -1) {
            		$(this).css('display', 'block');
            	}
            	else {
            		$(this).css('display', 'none');
            	}
            });

            // if (clear_search.hasClass('hidden')) {
            //     clear_search.removeClass('hidden');
            // }
        } else {
            skills_li.each(function (i, e) {
                $(e).css('display', 'block');
            });
        }
    });