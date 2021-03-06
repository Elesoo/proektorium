var listString;
var json_file = {};

function getClick(){
	$('#file_doc').click();
}

$(document).ready(function(){
	selectInquirerType("research");

	$('#file_doc').on('change', function(e){
		var block_file;
		for(var i = 0;  i <=  e.target.files.length-1; i++){
			var file = e.target.files[i];
			console.log(file.type);
			json_file[e.target.files[i].name] = e.target.files[i];
			var f = file;
			if (!file.type.match('image.*')) {
				var name_file = 'unname.png'
				switch( file.type){
					case 'application/x-ms-dos-executable': 
						name_file = 'exe.png';
						break;
					case 'application/zip':
						name_file = 'zip.png';
						break;
					case 'application/vnd.rar':
						name_file = 'rar.png';
						break;
					case 'application/msword':
						name_file = 'doc.png';
						break;
					case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
						name_file = 'doc.png';
						break;
					case 'application/pdf':
						name_file = 'pdf.png';
						break;
					case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
						name_file = 'ppt.png';
						break;
					case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
						name_file = 'xls.png';
						break;
					default: 
						name_file = 'unname.png';
				}
				var names = e.target.files[i].name;
				block_file = `<div class="col-3 pr-0">
								<button type="button" class="close" onclick="del(this, '${names}')">
						          <span>&times;</span>
						        </button>
						        <img class="img-fluid" src="/img/${name_file}" />
						        <p class="p_img" data-toggle="tooltip" title="${names}">${names}</p>
							  </div>`;
				$('.block_load').append(block_file);

			} else{
				var reader = new FileReader();
				reader.onload = (function(theFile) {
				var names = e.target.files[i].name;
				    return function(e) {
					 	block_file = `<div class="col-3 pr-0">
								<button type="button" class="close" onclick="del(this, '${names}')">
						          <span>&times;</span>
						        </button>
						        <img class="img-fluid" src="${e.target.result}" />
						        <p class="p_img" data-toggle="tooltip" title="${names}">${names}</p>
							  </div>`;
						$('.block_load').append(block_file);
				          
				    };
				})(f);
				reader.readAsDataURL(f);
			}
		}
		console.log(json_file);
	});
});

function selectInquirerType(projtype) {
	$(".inquirer_form").hide();
	$("#"+projtype+"_project").show();
}

function del(id, names){
	delete json_file[names];
	$(id).parent().remove();
	console.log(json_file);
}



function generateString(eventID) {
	var fd = new FormData();    
	emptyFieldsFlag=false;

	var json_fields={};
	var json_select= {};

	$(".inquirer_form:visible > tr").each(function () {
		if ($(this).find("textarea").length==0) {
			return true; //Skip iteration for attachment input
		}

		fieldName=$(this).find("td:first-child").html().trim();
		fieldText=$(this).find("textarea").val();

		if (fieldName.indexOf("*")==-1 && fieldText=="") {return true; } //Continue iterations

		if (fieldText=="" && fieldName.indexOf("*")!=-1) {
			console.log(fieldName);
			alert("Пустые поля");
			emptyFieldsFlag=true;
			return false;
		}

		json_fields[fieldName]=fieldText;
	});
	json_fields['eventID'] = eventID;
	listString=JSON.stringify(json_fields);

	if (emptyFieldsFlag) {
		return false;
	}

	fd.append('listString', listString);
	fd.append('project_type', $("#typeselector").val());
	fd.append('project_status', $("#typeStatus").val());
	fd.append('project_industry', $("#typeIndustry").val());

	for( key in json_file){
		fd.append('p_'+key, json_file[key]);
	}

	$.ajax({
		url: "/project/create",
		method: "POST",
		data: fd,
		processData: false,
		contentType: false,

		success: function() {
			alert("Заявка отправлена");
			// window.location.href = "/user";
		},
		error: function() {
			alert("Ошибка");
		}
	});
}
