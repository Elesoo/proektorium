function publishNDay(id) {
	var fd = new FormData();    
	emptyFieldsFlag=false;

	var json_fields={};
	var json_select= {};

	$(".publish_body:visible > tr").each(function () {
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
	listString=JSON.stringify(json_fields);

	if (emptyFieldsFlag) {
		return false;
	}

	fd.append('listString', listString);
	fd.append('cluster', $("#cluster").val());
	fd.append('ok', $("#ok").val());
	fd.append('cathedra', $("#valCafedra").val());
	fd.append('study_directions', $("#study_directions").val());
	// fd.append('project_industry', $("#typeIndustry").val());

	// for( key in json_file){
	// 	fd.append('p_'+key, json_file[key]);
	// }

	$.ajax({
		url: "/claim/dayn/publish/" + id,
		method: "POST",
		data: fd,
		processData: false,
		contentType: false,

		success: function() {
			alert("Заявка отправлена");
			window.location.href = "/user";
		},
		error: function() {
			alert("Ошибка");
		}
	});
}
