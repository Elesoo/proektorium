var json_photo = {};

function generateString() {
	var fd = new FormData();    
	emptyFieldsFlag=false;

	var json_fields={};

	$(".table_body > tr").each(function () {
		if ($(this).find("textarea").length==0) {
					return true; //Skip iteration for attachment input
				}

				fieldName=$(this).find("td:first").html().trim();
				fieldText=$(this).find("textarea").val();

				if (fieldName.indexOf("*")==-1 && fieldText=="") {return true; } //Continue iterations

				if (fieldText=="" && fieldName.indexOf("*")!=-1) {
					alert("Пустые поля");
					emptyFieldsFlag=true;
					return false;
				}

				json_fields[fieldName]=fieldText;
			});

	listString=JSON.stringify(json_fields);

	if (emptyFieldsFlag) {
		return false;
	}
			fd.append('listString', listString);
			
			for( key in json_photo){
				fd.append('p_'+key, json_photo[key]);
			}

			$.ajax({
				url: "/news/claim/create",
				method: "POST",
				data: fd,
				processData: false,
				contentType: false,

				success: function() {
					alert("Заявка отправлена");
					// window.location.href = "/news";
				},
				error: function() {
					alert("Ошибка");
				}
			});
		}

$(document).ready(function(){

	$('#file_doc').on('change', function(e){
		var img;
		for(var i = 0;  i <=  e.target.files.length-1; i++){
			var file = e.target.files[i];
			json_photo[e.target.files[i].name] = e.target.files[i];
			var f = file;
			var reader = new FileReader();
			reader.onload = (function(theFile) {
			var names = e.target.files[i].name;
			    return function(e) {
				 	img = `<div class="col-3">
							<button type="button" class="close" onclick="del(this, '${names}')">
					          <span>&times;</span>
					        </button>
					        <img class="img-fluid" src="${e.target.result}" />
					        <p class="p_img" data-toggle="tooltip" title="${names}">${names}</p>
						  </div>`;
					$('.img_load').append(img);
			          
			    };
			})(f);
			reader.readAsDataURL(f);
		}
		console.log(json_photo);
	});
});

function del(id, names){
	delete json_photo[names];
	$(id).parent().remove();
	console.log(json_photo);
}