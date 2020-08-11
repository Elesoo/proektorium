$(document).ready(function(){
	$('.group_item').on('click', function(){
		$('.list_card').find('.card').each(function(){
			$(this).removeClass('active');
		});

		var attr = $(this).data('target');

		$('#' + attr).addClass('active');
	});
})