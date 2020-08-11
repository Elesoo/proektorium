var Filters = {
  'filter_projtype'    : [],
  'filter_industry'    : [],
  'filter_status'      : [],
  'filter_role'        : [],
  'filter_place'       : [],
  'filter_client'      : [],
  'filter_employee'    : []
};

var result = [];

$(document).ready(function(){

	// console.log(result);

	$('.js-example-basic-single').select2();
	load_role();
  load_departments();
  load_employee();

	$('.js-example-basic-single').on('change', function (e) { 
    	switch ($(this).attr('id')){
        case 'filter_projtype':
          Filters['filter_projtype'] = $(this).val();
          // console.log(Filters);
          break;
        case 'filter_industry':
          Filters['filter_industry'] = $(this).val();
          // console.log(Filters);
          break;
        case 'filter_status': 
          Filters['filter_status'] = $(this).val();
          // console.log(Filters);
          break;
        case 'filter_role': 
          var chose = [];
          $('#filter_role option:selected').each(function(){
            chose.push($(this).data('id'));
          });
          Filters['filter_role'] = chose;
          // console.log(Filters);  
          break;
        case 'filter_client': 
          var chose = [];
          $('#filter_client option:selected').each(function(){
            chose.push($(this).data('id'));
          });
          Filters['filter_employee'] = chose;
          // console.log(Filters);
          break;
        case 'filter_employee': 
          var chose = [];
          $('#filter_employee option:selected').each(function(){
            chose.push($(this).data('id'));
          });
          Filters['filter_client'] = chose;
          // console.log(Filters);
          break;
      }
      filter_all();
	});

  $('.input-select').on('change', function(e){
    Filters['filter_place'] = $(this).val();
    // console.log(Filters);
    filter_all();
  });
});

function load_role(){
	var catalogAPI = '/api/roles';
	$.get(catalogAPI,{
      format: "json"
    }).done(function(data){
      data = JSON.parse(data);
      for(key in data){
      	var option = `<option data-id='${data[key].id}'>${data[key].name}</option>`
      	$('#filter_role').append(option);
      }
      // console.log(data);
    });
}

function load_departments(){
  var catalogAPI = '/api/departments';
  $.get(catalogAPI,{
      format: "json"
    }).done(function(data){
      data = JSON.parse(data);
      for(key in data){
        var option = `<option data-id='${key}'>${data[key]}</option>`
        $('#filter_client').append(option);
      }
      // console.log(data);
    });
}

function load_employee(){
  var catalogAPI = '/api/clients';
  $.get(catalogAPI,{
      format: "json"
    }).done(function(data){
      data = JSON.parse(data);
      for(key in data){
        var option = `<option data-id='${key}'>${data[key]}</option>`
        $('#filter_employee').append(option);
      }
      // console.log(data);
    });
}

function filter_all(){
  if (check_filters()){
    off_all();
    result.length = 0;
    $('.filter').each(function(index){
      var fl = false;
      $(this).children('.crd').children('input').each(function(index){
        // console.log($(this));
        var key = 0;
        for( key in Filters[$(this).data('type')]){
          // console.log(Filters[$(this).data('type')][key]);
          if($(this).data('type') == 'filter_role'){
          // console.log(key);
          // console.log($(this).data('type'));
            var data = JSON.parse($(this).val());
            // console.log(data);
            if(data.length == 0){
              fl = false;
              return fl;
            }

            for( var keys in data ){
              // console.log(keys);
              // console.log(data[keys]);
              // console.log(Filters[$(this).data('type')][key]);

              if(data[keys].role == Filters[$(this).data('type')][key]){
                fl = true;
                return fl;
              } else {
                fl = false;
              }
            }
              console.log(fl);
              return fl;
          } else {
            // console.log($(this).data('type'));
            // console.log(Filters[$(this).data('type')]);

            // console.log(Filters[$(this).data('type')][key]);
            // console.log($(this).val());

            if (Filters[$(this).data('type')][key] == $(this).val()){
              fl = true;
            } else {
              fl = false;
              return fl;
            }
          }
        }
      });
      if (fl){
        result.push($('.row').find('.filter').eq(index));
      }
      // console.log(fl);
      // console.log(result);
    });

    for( var key in result){
      result[key].show();
    }

  } else {
    on_all();
  }

}


function on_all(){
  $('.filter').each(function(){
    $(this).show();
  });
}

function off_all(){
  $('.filter').each(function(){
    $(this).hide();
  });
}

function check_filters(){
  if(Filters['filter_projtype'].length != 0 ||
     Filters['filter_industry'].length != 0 ||
     Filters['filter_status'].length != 0 ||
     Filters['filter_role'].length != 0 ||
     Filters['filter_place'].length != 0||
     Filters['filter_client'].length != 0||
     Filters['filter_employee'].length != 0){
    // console.log('yes');
    return true
  } else {
    // console.log('no');
    return false
  }
}

