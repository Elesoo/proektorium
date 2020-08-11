function equalizeCardCaptions() {

$(".proj-section").each(function(){
	var heights = $(this).find(".brand-project > p:first-of-type").map(function ()
    {
        return $(this).height();
    }).get();
maxHeight = Math.max.apply(null, heights);

$(this).find('.brand-project > p:first-of-type').each(function(i){
	$(this).css('line-height', maxHeight/(heights[i]/1));
});

});

}



$(document).ready(function() {equalizeCardCaptions();});