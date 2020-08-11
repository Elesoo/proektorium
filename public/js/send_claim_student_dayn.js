window.onload()=()=>{alert("Соси хуй");};
function sendStudentClaim(id) {
	$.ajax({
		url: "/project/dayn/sendClaim/"+id,
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