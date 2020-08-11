		var listString;



		function generateString() {
			var fd = new FormData();    
			emptyFieldsFlag=false;

			var json_fields={};

			$(".inquirer_form:visible > .table > .tbody > tr").each(function () {
				if ($(this).find("textarea").length==0) {
					return true; //Skip iteration for attachment input
				}

				fieldName=$(this).find("td:first-child").html().trim();
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

			if ($(".inquirer_form:visible input")[0].files.length>0) { //Adds attachment only if presents
				attachement=$(".inquirer_form:visible input")[0].files[0];
				fd.append('attachment', attachement, attachement.name);
			}

			if ($('input[type="file"]')[1].files.length>0) { //Adds attachment only if presents
                  attachement=$('input[type="file"]')[1].files[0];
                  fd.append('header_image', attachement, attachement.name);
                }

			fd.append('listString', listString);

			$.ajax({
				url: "/user/employee/claim/newDepartment",
				method: "POST",
				data: fd,
				processData: false,
				contentType: false,

				success: function(data) {
					alert("Заявка отправлена");
					window.location.href = "/user";
				},
				error: function(data) {
					console.log(data.responseText);
					if (data.responseText == "not allowed to create")
					{
						alert("Нельзя создавать более одного подразделения. Вы уже подали заявку на создание подразделения или уже являетесь администратор подразделения");
					}
					else
						alert("Ошибка");
				}
			});
		}
