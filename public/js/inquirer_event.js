		var listString;

		$(document).ready(function(){
			selectInquirerType("research");
		});

		function selectInquirerType(projtype) {
			$(".inquirer_form").hide();
			$("#"+projtype+"_project").show();
		}



		function generateString(eventID) {
			var fd = new FormData();    
			emptyFieldsFlag=false;

			var json_fields={};

			$(".inquirer_form:visible > tr").each(function () {
				if ($(this).find("textarea").length==0) {
					return true; //Skip iteration for attachment input
				}

				fieldName=$(this).find("label:first-of-type").html().trim();
				fieldText=$(this).find("textarea").val();

				if (fieldName.indexOf("*")==-1 && fieldText=="") {return true; } //Continue iterations

				if (fieldText=="" && fieldName.indexOf("*")!=-1) {
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

			if ($(".inquirer_form:visible input")[0].files.length>0) { //Adds attachment only if presents
				attachement=$(".inquirer_form:visible input")[0].files[0];
				fd.append('attachment', attachement, attachement.name);
			}
			fd.append('listString', listString);
			fd.append('project_type', $("#typeselector").val());

			$.ajax({
				url: "/project/create",
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
